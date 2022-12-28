import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Content} from "../entities/content.entity";
import {BlockedDay} from "../entities/blocked_day.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Content, BlockedDay])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
