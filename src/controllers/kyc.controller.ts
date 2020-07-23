import { Controller, UseFilters, Get, Req } from "@nestjs/common";
import { HttpExceptionFilter } from "src/filters/http-exception.filter";
import { KycService } from "../services/kyc.service";

@Controller("kyc")
export class KycController {

    constructor(private readonly kycService: KycService) {

    }

    @UseFilters(new HttpExceptionFilter())
    @Get("status")
    public async getKycStatus(@Req() request: Request): Promise<any> {
        try {
            const userId = request["user"]["_id"];
            const response = await this.kycService.getKycStatus({
                userId: userId
            })
            return response;
        } catch (exception) {
            throw exception;
        }
    }
}