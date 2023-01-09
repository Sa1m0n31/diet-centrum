import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Purchase} from "../entities/purchase.entity";
import {In, Repository} from "typeorm";
import * as crypto from 'crypto';
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import {Day} from "../entities/day.entity";
import {MailerService} from "@nestjs-modules/mailer";
import {Product} from "../entities/product.entity";

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(Purchase)
        private readonly purchaseRepository: Repository<Purchase>,
        @InjectRepository(Day)
        private readonly dayRepository: Repository<Day>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly mailerService: MailerService
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

    async updatePurchaseStatus(id, status) {
        return this.purchaseRepository.createQueryBuilder()
            .update({
                status
            })
            .where({
                id
            })
            .execute();
    }

    addTrailingZero(n) {
        if(n < 10) {
            return `0${n}`;
        }
        else {
            return n;
        }
    }

    async paymentProcess(id, amount, email) {
        let hash, data, gen_hash;
        const sessionId = uuid();
        hash = crypto.createHash('sha384');
        data = hash.update(`{"sessionId":"${sessionId}","merchantId":${process.env.PRZELEWY_24_CLIENT_ID},"amount":${parseFloat(amount)*100},"currency":"PLN","crc":"${process.env.PRZELEWY_24_CRC}"}`, 'utf-8');
        gen_hash = data.digest('hex');

        // Add payment id
        await this.purchaseRepository.createQueryBuilder()
            .update({
                payment_id: sessionId
            })
            .where({
                id
            })
            .execute();

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
            urlReturn: `${process.env.WEBSITE_URL}/dziekujemy`,
            urlStatus: `${process.env.API_URL}/purchase/verifyPayment`,
            sign: gen_hash
        };

        try {
            const res = await axios.post('https://sandbox.przelewy24.pl/api/v1/transaction/register', postData, {
                headers: {
                    Authorization: `Basic ${process.env.PRZELEWY_24_AUTH_HEADER}`
                }
            });

            if(res) {
                return {
                    token: res.data.data.token,
                    sign: gen_hash
                }
            }
            else {
                return 0;
            }
        }
        catch(e) {
            return 0;
        }
    }

    async addPurchase(files, body) {
        const { cart, firstName, lastName, street, building, flat, postalCode, city, phoneNumber, email,
            emailToSend, sendDate, invoice, paperVersion, discountCode, discountValue, sum} = body;

        try {
            const addResult = await this.purchaseRepository.save({
                cart,
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
                attachment: files?.attachment ? files.attachment[0]?.path : '',
                status: 'W realizacji',
                sum
            });

            // Change limit - decrement by 1
            const dateObject = JSON.parse(sendDate);
            const changePurchaseLimitObject = await this.dayRepository.findOneBy({
                day: dateObject.day,
                month: dateObject.monthNumber,
                year: dateObject.year
            });
            changePurchaseLimitObject.purchase_limit--;
            await this.dayRepository.save(changePurchaseLimitObject);

            // Send mail to client
            const productsIds = JSON.parse(cart).map((item) => (item.id));
            const orderCart = await this.productRepository.findBy({
                id: In(productsIds)
            });
            const orderTable = orderCart.map((item, index) => {
                return `<tr>
                    <td style="border: 1px solid #313131; padding: 4px 10px;">
                        ${index+1}
                    </td>
                    <td style="border: 1px solid #313131; padding: 4px 10px;">
                        ${item.title}
                    </td>
                    <td style="border: 1px solid #313131; padding: 4px 10px;">
                        ${item.price} zł
                    </td>
                </tr>`;
            });

            const dateToDisplay = `${this.addTrailingZero(dateObject.day)}.${this.addTrailingZero(dateObject.monthNumber)}.${dateObject.year}`;

            await this.mailerService.sendMail({
                to: emailToSend,
                from: process.env.EMAIL_ADDRESS,
                subject: 'Otrzymaliśmy Twoje zamówienie',
                html: `<div>
                    <img style="margin: auto; width: 300px; display: block;" src="https://diet-centrum.klient-skylo.pl/static/media/logo-footer.87837e4f19f137882985.png" alt="diet-centrum" />
                    <h2 style="display: block; text-align: center; width: 100%;">
                        Dziękujemy za złożenie zamówienia w Diet Centrum!<br/>Swój plan otrzymasz do ${dateToDisplay}.
                    </h2>
                    <h4 style="display: block; width: 100%; text-align: center; margin-bottom: 0;">
                        Szczegóły zamówienia:
                    </h4>
                    <table style="margin-top: 15px; margin-left: auto; margin-right: auto; border-collapse: collapse; text-align: center;">
                        <tr>
                            <td style="border: 1px solid #313131; padding: 4px 10px;">
                                 Id zamówienia:
                            </td>
                            <td style="border: 1px solid #313131; padding: 4px 10px;">
                                <b>${addResult.id}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #313131; padding: 4px 10px;">
                                 Imię i nazwisko:
                            </td>
                            <td style="border: 1px solid #313131; padding: 4px 10px;">
                                <b>${firstName} ${lastName}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #313131; padding: 4px 10px;">
                                  Nr telefonu:
                            </td>
                            <td style="border: 1px solid #313131; padding: 4px 10px;">
                                <b>${phoneNumber}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #313131; padding: 4px 10px;">
                                 Email, na który ma być wysłany plan:
                            </td>
                            <td style="border: 1px solid #313131; padding: 4px 10px;">
                                <b>${emailToSend}</b>
                            </td>
                        </tr>
                    </table>
                    
                    <h4 style="display: block; width: 100%; text-align: center; margin-bottom: 0;">
                        Zamówione plany:
                    </h4>
                    <table style="border-collapse: collapse; margin-top: 15px; margin-left: auto; margin-right: auto; ">
                        ${orderTable}
                    </table>
                    
                    <p style="text-align: center;">
                        Pozdrawiam,<br/>
                        Tomasz Dębiński
                    </p>
                </div>`
            });

            if(addResult) {
                return this.paymentProcess(addResult.id, sum, email);
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
                if(res.data.data.status === 'success') {
                    const updateOrderStatusResult = await this.purchaseRepository.createQueryBuilder()
                        .update({
                            payment_status: 'Opłacone'
                        })
                        .where({
                            payment_id: sessionId
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
