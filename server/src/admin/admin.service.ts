import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Content} from "../entities/content.entity";
import {Repository} from "typeorm";
import {BlockedDay} from "../entities/blocked_day.entity";
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Content)
        private readonly contentRepository: Repository<Content>,
        @InjectRepository(BlockedDay)
        private readonly blockedDayRepository: Repository<BlockedDay>,
        private readonly mailerService: MailerService
    ) {
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

    async getBlockedDays() {
        return this.blockedDayRepository.find();
    }

    async updateBlockedDays(days) {
        try {
            // Delete all blocked days
            await this.blockedDayRepository.createQueryBuilder()
                .delete()
                .where(
                    'id > :id', { id: 0 }
                )
                .execute();

            // Insert new blocked days
            for(const item of days) {
                await this.blockedDayRepository.save({
                    day: item.day,
                    month: item.month,
                    year: item.year
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
        })
    }
}
