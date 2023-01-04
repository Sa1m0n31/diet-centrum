import {Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {BlogService} from "./blog.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {FileUploadHelper} from "../common/FileUploadHelper";
import {Express} from "express";

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {}

    @Get('/getAll')
    getAllArticles() {
        return this.blogService.getAllArticles();
    }

    @Get('/getById/:id')
    getArticleById(@Param('id') id) {
        return this.blogService.getArticleById(id);
    }

    @Get('/getBySlug/:slug')
    getArticleBySlug(@Param('slug') slug) {
        return this.blogService.getArticleBySlug(slug);
    }

    @Post('/add')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1}
    ], {
        storage: diskStorage({
            filename: FileUploadHelper.customFileName,
            destination: '../uploads/blog'
        })
    }))
    addArticle(@UploadedFiles() files: {
        image?: Express.Multer.File[]
    }, @Body() body) {
       return this.blogService.addArticle(body, files);
    }

    @Patch('/update')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1}
    ], {
        storage: diskStorage({
            filename: FileUploadHelper.customFileName,
            destination: '../uploads/blog'
        })
    }))
    updateArticle(@UploadedFiles() files: {
        image?: Express.Multer.File[]
    }, @Body() body) {
        return this.blogService.updateArticle(body, files);
    }

    @Delete('/delete/:id')
    deleteArticle(@Param('id') id) {
        return this.blogService.deleteArticle(id);
    }

    @Get('/getAllCategories')
    getAllCategories() {
        return this.blogService.getAllCategories();
    }

    @Post('/addCategory')
    addCategory(@Body() body) {
        return this.blogService.addCategory(body.name);
    }

    @Patch('/updateCategory')
    updateCategory(@Body() body) {
        return this.blogService.updateCategory(body.id, body.name);
    }

    @Delete('/deleteCategory/:id')
    deleteCategory(@Param('id') id) {
        return this.blogService.deleteCategory(id);
    }
}
