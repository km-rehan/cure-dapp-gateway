import { Module } from "@nestjs/common";
import { KycController } from "src/controllers/kyc.controller";
import { KycService } from "src/services/kyc.service";

@Module({
    imports: [
    ],
    exports: [KycService],
    providers: [KycService],
    controllers: [KycController]
})
export class KycModule {}