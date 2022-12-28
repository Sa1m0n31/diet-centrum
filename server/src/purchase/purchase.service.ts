import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Purchase} from "../entities/purchase.entity";
import {Repository} from "typeorm";
import * as crypto from 'crypto';
import axios from 'axios'
import { v4 as uuid } from 'uuid';

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(Purchase)
        private readonly purchaseRepository: Repository<Purchase>
    ) {
    }

    async getAllPurchases() {
        return this.purchaseRepository.find();
    }

    async getPurchaseById(id) {
        return this.purchaseRepository.findOneBy({
            id
        });
    }

    async paymentProcess(amount, email) {
        let hash, data, gen_hash;
        const sessionId = uuid();
        hash = crypto.createHash('sha384');
        data = hash.update(`{"sessionId":"${sessionId}","merchantId":${process.env.PRZELEWY_24_CLIENT_ID},"amount":${parseFloat(amount)*100},"currency":"PLN","crc":"${process.env.PRZELEWY_24_CRC}"}`, 'utf-8');
        gen_hash = data.digest('hex');

        let postData = {
            sessionId: sessionId,
            posId: process.env.PRZELEWY_24_CLIENT_ID,
            merchantId: process.env.PRZELEWY_24_CLIENT_ID,
            amount: parseFloat(amount) * 100,
            currency: "PLN",
            description: "Płatność za zakupy w sklepie Diet Centrum",
            email: email,
            country: "PL",
            language: "pl",
            encoding: "utf-8",
            urlReturn: `${process.env.API_URL}/dziekujemy`,
            urlStatus: `${process.env.API_URL}/order/verifyPayment`,
            sign: gen_hash
        };

        try {
            const res = await axios.post('https://sandbox.przelewy24.pl/api/v1/transaction/register', postData, {
                headers: {
                    Authorization: `Basic ${process.env.PRZELEWY_24_AUTH_HEADER}`
                }
            });

            if(res) {
                const responseToClient = res.data.token;

                console.log(responseToClient);

                return {
                    result: responseToClient,
                    sign: gen_hash
                }
            }
            else {
                return 0;
            }
        }
        catch(e) {
            console.log(e);
            return 0;
        }
    }

    async addPurchase(body) {
        const { firstName, lastName, street, building, flat, postalCode, city, phoneNumber, email,
            emailToSend, sendDate, invoice, paperVersion, discountCode, discountValue, sum} = body;

        try {
            const addResult = await this.purchaseRepository.save({
                first_name: firstName,
                last_name: lastName,
                street,
                building,
                flat,
                postal_code: postalCode,
                city,
                phone_number: phoneNumber,
                email,
                email_to_send: emailToSend,
                purchase_date: new Date(),
                send_date: sendDate,
                invoice: invoice ? invoice : null,
                paper_version: paperVersion,
                discount_code: discountCode,
                discount_value: discountValue,
                payment_id: null,
                payment_status: 'Nieopłacone',
                sum
            });

            if(addResult) {
                return this.paymentProcess(sum, email);
            }
            else {
                throw new HttpException('Coś poszło nie tak... Prosimy spróbować później.', 500);
            }
        }
        catch(e) {
            throw new HttpException('Coś poszło nie tak... Prosimy spróbować później.', 500);
        }
    }

    async verifyPayment(body) {
        let { merchantId, posId, sessionId, amount, currency, orderId } = body;

        /* Calculate SHA384 checksum */
        try {
            let hash, data, gen_hash;
            hash = crypto.createHash('sha384');
            data = hash.update(`{"sessionId":"${sessionId}","orderId":${orderId},"amount":${amount},"currency":"PLN","crc":"${process.env.PRZELEWY_24_CRC}"}`, 'utf-8');
            gen_hash = data.digest('hex');

            const res = await axios.put("https://sandbox.przelewy24.pl/api/v1/transaction/verify", {
                merchantId,
                posId,
                sessionId,
                amount,
                currency,
                orderId,
                sign: gen_hash
            }, {
                responseType: 'json',
                headers: {
                    Authorization: `Basic ${process.env.PRZELEWY_24_AUTH_HEADER}`
                }
            });

            if(res) {
                if(res.data.status === 'success') {
                    const updateOrderStatusResult = await this.purchaseRepository.createQueryBuilder()
                        .update({
                            payment_status: 'Opłacone'
                        })
                        .where({
                            payment_id: orderId
                        })
                        .execute();

                    if(updateOrderStatusResult) {
                        return {
                            status: 'OK'
                        }
                    }
                }
            }
            else {
                throw new HttpException('Coś poszło nie tak... Prosimy spróbować później.', 500);
            }
        }
        catch(e) {
            throw new HttpException('Coś poszło nie tak... Prosimy spróbować później.', 500);
        }
    }
}
