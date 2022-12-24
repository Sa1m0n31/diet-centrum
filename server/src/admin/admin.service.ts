import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Content} from "../entities/content.entity";
import {Repository} from "typeorm";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Content)
        private readonly contentRepository: Repository<Content>
    ) {
    }

    async updateContent(data) {
        const dataArray = Object.entries(data);

        for(const entry of dataArray) {
            let key: any = entry[0];
            let value: any = entry[1];

            console.log(key, value);

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
}
