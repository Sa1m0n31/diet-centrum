import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PurchaseService} from "./purchase.service";

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
    addPurchase(@Body() body) {
        return this.purchaseService.addPurchase(body);
    }

    @Post('/verifyPayment')
    verifyPayment(@Body() body) {
        return this.purchaseService.verifyPayment(body);
    }
}
