import {Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {PurchaseService} from "./purchase.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {FileUploadHelper} from "../common/FileUploadHelper";
import {Express} from "express";

@Controller('purchase')
export class PurchaseController {
    constructor(
        private readonly purchaseService: PurchaseService
    ) {
    }

    @Get('/getAll')
    getAllPurchases() {
        return this.purchaseService.getAllPurchases();
    }

    @Get('/getById/:id')
    getById(@Param('id') id) {
        return this.purchaseService.getPurchaseById(id);
    }

    @Post('/add')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'attachment', maxCount: 1}
    ], {
        storage: diskStorage({
            filename: FileUploadHelper.customFileName,
            destination: '../uploads/attachments'
        })
    }
    ))
    addPurchase(@UploadedFiles() files: {
        attachment?: Express.Multer.File[]
    }, @Body() body) {
        return this.purchaseService.addPurchase(files, body);
    }

    @Post('/verifyPayment')
    verifyPayment(@Body() body) {
        return this.purchaseService.verifyPayment(body);
    }

    @Patch('/updateStatus')
    updateStatus(@Body() body) {
        return this.purchaseService.updatePurchaseStatus(body.id, body.status);
    }
}
