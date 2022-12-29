import {Body, Controller, Get, Patch, Post} from '@nestjs/common';
import {AdminService} from "./admin.service";

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {
    }

    @Patch('/updateTexts')
    updateTexts(@Body() body) {
        return this.adminService.updateTexts(body.termsOfService, body.privacyPolicy);
    }

    @Patch('/updateContent')
    updateContent(@Body() body) {
        return this.adminService.updateContent(body);
    }

    @Get('/getContent')
    getContent() {
        return this.adminService.getContent();
    }

    @Get('/getBlockedDays')
    getBlockedDays() {
        return this.adminService.getBlockedDays();
    }

    @Post('/updateBlockedDays')
    updateBlockedDays(@Body() body) {
        return this.adminService.updateBlockedDays(body.days);
    }

    @Post('/sendContactForm')
    sendContactForm(@Body() body) {
        return this.adminService.sendContactForm(body.name, body.email, body.phoneNumber, body.message);
    }
}
