import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import * as Joi from "@hapi/joi";
import {MailerModule} from "@nestjs-modules/mailer";
import {join} from "path";
import { ServeStaticModule } from '@nestjs/serve-static';
import {ProductModule} from "./product/product.module";
import {PurchaseModule} from "./purchase/purchase.module";
import {BlogModule} from "./blog/blog.module";
import {AdminModule} from "./admin/admin.module";
import { CodeModule } from './code/code.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      DATABASE_HOST: Joi.required(),
      DATABASE_PORT: Joi.number().default(3306)
    })
  }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: false
    }),
    MailerModule.forRoot({
      transport: `smtp://${process.env.EMAIL_ADDRESS}:${process.env.EMAIL_PASSWORD}@${process.env.EMAIL_HOST}`,
      defaults: {
        from: process.env.EMAIL_ADDRESS,
        tls: {
          rejectUnauthorized: false
        },
        secure: true
      }
    }), ProductModule, PurchaseModule, BlogModule, AdminModule, CodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
