import {Body, Controller, Get, Patch} from '@nestjs/common';
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
}
