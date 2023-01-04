import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Content} from "../entities/content.entity";
import {Day} from "../entities/day.entity";
import {Admin} from "../entities/admin.entity";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../common/jwt.strategy";

@Module({
  imports: [
      TypeOrmModule.forFeature([Content, Day, Admin]),
      JwtModule.register({
        secret: process.env.JWT_KEY,
        signOptions: {expiresIn: 60 * 300}
      })
  ],
  providers: [AdminService, JwtStrategy],
  controllers: [AdminController]
})
export class AdminModule {}
