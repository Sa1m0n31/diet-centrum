import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DiscountCode} from "../entities/discount_code.entity";
import {Repository} from "typeorm";

@Injectable()
export class CodeService {
    constructor(
        @InjectRepository(DiscountCode)
        private readonly codeRepository: Repository<DiscountCode>
    ) {
    }

    async addCode(code: string, discount_type: number, discount_value: number) {
        console.log(code);
        return this.codeRepository.save({
            code,
            discount_type,
            discount_value
        });
    }

    async deleteCode(id: number) {
        return this.codeRepository.delete({
            id
        });
    }

    async updateCode(id, code, discount_type, discount_value) {
        return this.codeRepository.createQueryBuilder()
            .update({
                code, discount_type, discount_value
            })
            .where({
                id
            })
            .execute();
    }

    async getAllCodes() {
        return this.codeRepository.find();
    }

    async verifyCode(code: string) {
        const codeResult = await this.codeRepository.findOneBy({
            code
        });

        if(codeResult) {
            return codeResult;
        }
        else {
            throw new HttpException('Podany kod nie istnieje', 400);
        }
    }
}
