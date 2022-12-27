import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CodeService} from "./code.service";

@Controller('code')
export class CodeController {
    constructor(
        private readonly codeService: CodeService
    ) {
    }

    @Post('/add')
    addCode(@Body() body) {
        return this.codeService.addCode(body.code, body.discountType, body.discountValue);
    }

    @Patch('/update')
    updateCode(@Body() body) {
        return this.codeService.updateCode(body.id, body.code, body.discountType, body.discountValue);
    }

    @Delete('/delete/:id')
    deleteCode(@Param('id') id) {
        return this.codeService.deleteCode(id);
    }

    @Get('/getAll')
    getAllCodes() {
        return this.codeService.getAllCodes();
    }

    @Get('/verify/:code')
    verifyCode(@Param('code') code) {
        return this.codeService.verifyCode(code);
    }
}
