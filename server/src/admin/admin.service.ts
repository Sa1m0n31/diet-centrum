import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Content} from "../entities/content.entity";
import {Repository} from "typeorm";
import {BlockedDay} from "../entities/blocked_day.entity";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Content)
        private readonly contentRepository: Repository<Content>,
        @InjectRepository(BlockedDay)
        private readonly blockedDayRepository: Repository<BlockedDay>
    ) {
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
}
