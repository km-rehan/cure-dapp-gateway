import { Module } from "@nestjs/common";
import { KycController } from "src/controllers/kyc.controller";
import { KycService } from "src/services/kyc.service";

@Module({
    imports: [
    ],
    exports: [KycController],
    providers: [KycService],
    controllers: [KycService]
})
export class KycModule {}