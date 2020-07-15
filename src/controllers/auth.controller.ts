import { Controller, Req, Post, UseFilters, HttpException, HttpStatus, Get } from "@nestjs/common";
import { Request } from "express";
import { HttpExceptionFilter } from "../filters/http-exception.filter";
import { AuthService } from "../services/auth.service";
import { VerifyMessageDTO } from "../dtos/verify-message.dto";
import * as _ from "lodash";
import { EmailBodyDTO } from "src/dtos/email-body.dto";

@Controller("api/auth")
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @UseFilters(new HttpExceptionFilter())
    @Get("getUserSessionId")
    public getUserSessionId(@Req() request: Request): any {
        return this.authService.getUniqueSessionId(request);
    }

    @UseFilters(new HttpExceptionFilter())
    @Post("verifyMessage")
    public async verifyMessage(@Req() request: Request): Promise<any> {
        try {
            const sessionId = request.sessionID;
            const { walletAddress, signature } = request.body;
            const verifyMessageDTO: VerifyMessageDTO = {
                tokenId: sessionId,
                signature: signature,
                walletAddress: walletAddress
            }
            const verifyMessageResponse = await this.authService.verfiyMessageService(verifyMessageDTO);
            if (!verifyMessageResponse.body) throw new HttpException("Login failed", HttpStatus.CONFLICT);
            await this.authService.sendEmailToNewUser(verifyMessageResponse.body);
            return verifyMessageResponse;
        } catch (exception) {
            throw exception;
        }
    }
}