import {Body, Controller, Get, Patch, Post} from '@nestjs/common';
import {AdminService} from "./admin.service";

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {
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
}
