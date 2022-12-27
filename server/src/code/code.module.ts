import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DiscountCode} from "../entities/discount_code.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DiscountCode])],
  providers: [CodeService],
  controllers: [CodeController]
})
export class CodeModule {}
