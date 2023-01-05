import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Content} from "../entities/content.entity";
import {Repository} from "typeorm";
import {Day} from "../entities/day.entity";
import {MailerService} from "@nestjs-modules/mailer";
import * as crypto from "crypto";
import {Admin} from "../entities/admin.entity";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Content)
        private readonly contentRepository: Repository<Content>,
        @InjectRepository(Day)
        private readonly blockedDayRepository: Repository<Day>,
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        private readonly jwtTokenService: JwtService,
        private readonly mailerService: MailerService
    ) {
    }

    async loginAdmin(username: string, password: string) {
        const payload = { username: username, sub: password, role: 'admin' };
        const passwordHash = crypto
            .createHash('sha256')
            .update(password)
            .digest('hex');

        const user = await this.adminRepository.findOneBy({
            username,
            password: passwordHash
        });

        if(user) {
            return {
                access_token: this.jwtTokenService.sign(payload, {
                    secret: process.env.JWT_KEY
                })
            }
        }
        else {
            throw new HttpException('Niepoprawna nazwa użytkownika lub hasło', 401);
        }
    }

    async updateTexts(termsOfService, privacyPolicy) {
        await this.contentRepository.save({
            field: 'termsOfService',
            value: termsOfService
        });

        return this.contentRepository.save({
            field: 'privacyPolicy',
            value: privacyPolicy
        });
    }

    async updateContent(data) {
        const dataArray = Object.entries(data);

        for(const entry of dataArray) {
            let key: any = entry[0];
            let value: any = entry[1];

            await this.contentRepository.save({
                field: key,
                value: value
            });
        }

        return 1;
    }

    async getContent() {
        return this.contentRepository.find();
    }

    async getDays() {
        return this.blockedDayRepository.find();
    }

    async updateDays(days) {
        try {
            // Insert new blocked days
            for(const item of days) {
                await this.blockedDayRepository.save({
                    id: item.id,
                    day: item.day,
                    month: item.monthNumber,
                    year: item.year,
                    price: item.price,
                    purchase_limit: item.limit
                });
            }

            return 1;
        }
        catch(e) {
            throw new HttpException('Coś poszło nie tak...', 500);
        }
    }

    async sendContactForm(name, email, phoneNumber, message) {
        return this.mailerService.sendMail({
            to: process.env.CONTACT_FORM_ADDRESS,
            from: process.env.EMAIL_ADDRESS,
            subject: 'Nowa wiadomość w formularzu kontaktowym',
            html: `<div>
                    <h2>
                        Ktoś wysłał wiadomość w formularzu kontaktowym Diet Centrum!
                    </h2>
                    <p>
                        Imię: ${name}<br/>
                        Nr telefonu: ${phoneNumber}<br/>
                        Email: ${email}<br/>
                        Wiadomość: ${message}
                    </p>
                </div>`
        });
    }
}
