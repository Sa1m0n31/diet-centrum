import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Purchase} from "../entities/purchase.entity";
import {Day} from "../entities/day.entity";
import {Product} from "../entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Product, Day])],
  providers: [PurchaseService],
  controllers: [PurchaseController]
})
export class PurchaseModule {}
