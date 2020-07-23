import { Injectable } from "@nestjs/common";
import { exception } from "console";
import { GetKycDto } from "src/dtos/get-kyc.dto";
import { Client, Transport, ClientProxy } from "@nestjs/microservices";

@Injectable()
export class KycService {
    
    @Client({
        transport: Transport.REDIS,
        options: {
            url: `redis://localhost:${6379}`
        }
    })
    client: ClientProxy;

    constructor() {

    }

    public async getKycStatus(getKycDto: GetKycDto): Promise<any> {
        try {
            const user = await this.client.send<any>(
                {
                    cmd: 'get-kyc-status'
                },
                getKycDto
            )

            return user;
        } catch (error) {
            throw exception;
        }
    }
}