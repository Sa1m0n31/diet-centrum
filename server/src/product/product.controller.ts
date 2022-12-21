import {Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ProductService} from "./product.service";
import {Express} from "express";
import {diskStorage} from "multer";
import {FileUploadHelper} from "../common/FileUploadHelper";

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {
    }

    @Post('/add')
    @UseInterceptors(FileFieldsInterceptor([
            {name: 'image', maxCount: 1}
        ], {
            storage: diskStorage({
                filename: FileUploadHelper.customFileName,
                destination: './uploads/product'
            })
        }
    ))
    addProduct(@UploadedFiles() files: {
        image?: Express.Multer.File[]
    }, @Body() body) {
        return this.productService.addProduct(files, body);
    }

    @Patch('/update')
    @UseInterceptors(FileFieldsInterceptor([
            {name: 'image', maxCount: 1}
        ], {
            storage: diskStorage({
                filename: FileUploadHelper.customFileName,
                destination: './uploads/product'
            })
        }
    ))
    updateProduct(@UploadedFiles() files: {
        image?: Express.Multer.File[]
    }, @Body() body) {
        return this.productService.updateProduct(files, body);
    }

    @Get('/getAll')
    getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get('/getBySlug/:slug')
    getProductBySlug(@Param('slug') slug) {
        return this.productService.getProductBySlug(slug);
    }

    @Get('/getById/:id')
    getProductById(@Param('id') id) {
        return this.productService.getProductById(id);
    }

    @Delete('/delete/:id')
    deleteProductById(@Param('id') id) {
        return this.productService.deleteProduct(id);
    }
}
