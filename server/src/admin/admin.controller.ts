import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Req,
    UnauthorizedException, UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AdminService} from "./admin.service";
import {JwtAuthGuard} from "../common/jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {FileUploadHelper} from "../common/FileUploadHelper";
import {Express} from "express";

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('/auth')
    auth(@Req() req) {
        const decodedJwt: any = this.jwtService.decode(req.headers.authorization.split(' ')[1]);

        if((decodedJwt.username !== req.body.username) ||
            (decodedJwt.role !== req.body.role) ||
            (decodedJwt.role !== 'admin')) {
            throw new UnauthorizedException();
        }

        return true;
    }

    @Post('/login')
    adminLogin(@Body() body) {
        return this.adminService.loginAdmin(body.username, body.password);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/updateTexts')
    updateTexts(@Body() body) {
        return this.adminService.updateTexts(body.termsOfService, body.privacyPolicy);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/updateContent')
    updateContent(@Body() body) {
        return this.adminService.updateContent(body);
    }

    @Patch('/updateAttachment')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'attachment', maxCount: 1}
        ], {
            storage: diskStorage({
                filename: FileUploadHelper.customFileName,
                destination: '../uploads/attachmentToDownload'
            })
        }
    ))
    updateAttachment(@UploadedFiles() files: {
        attachment?: Express.Multer.File[]
    }) {
        return this.adminService.updateAttachment(files);
    }

    @Get('/getContent')
    getContent() {
        return this.adminService.getContent();
    }

    @Get('/getDays')
    getBlockedDays() {
        return this.adminService.getDays();
    }

    @UseGuards(JwtAuthGuard)
    @Post('/updateDays')
    updateBlockedDays(@Body() body) {
        return this.adminService.updateDays(body.days);
    }

    @Post('/sendContactForm')
    sendContactForm(@Body() body) {
        return this.adminService.sendContactForm(body.name, body.email, body.phoneNumber, body.message);
    }
}
