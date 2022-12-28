import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import {Blog} from "../entities/blog.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BlogCategory} from "../entities/blog_category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Blog, BlogCategory])],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule {}
