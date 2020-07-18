import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { EmailBodyDTO } from "../dtos/email-body.dto";
import { VerifyMessageDTO } from "../dtos/verify-message.dto";
import { Request } from "express";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;

@Injectable()
export class AuthService {

    @Client({
        transport: Transport.REDIS,
        options: {
            url: `redis://${REDIS_HOST}:${REDIS_PORT}`
        }
    })
    client: ClientProxy;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
    }

    public async sendEmailToNewUser(emailBodyDTO: EmailBodyDTO): Promise<any> {
        try {
            const response = await this.client.send<any>(
                {
                    cmd: 'send-new-user-email'
                },
                emailBodyDTO
            )
            return response.toPromise();
        } catch (exception) {
            throw exception;
        }
    }

    public getUniqueSessionId(request: Request): any {
        if (!request.session.newSession)
            request.session.newSession = 1;
        else
            request.session.newSession++
        
        const data = {
            sessionToken: request.sessionID
        }

        return data;
    }

    public async verfiyMessageService(verifyMessageDTO: VerifyMessageDTO): Promise<any> {
        try {
            const response = await this.client.send<any>(
                {
                    cmd: 'verify-login-message'
                },
                verifyMessageDTO
            )

            return response.toPromise();
        } catch (exception) {
            throw exception;
        }
    }

    public async verifyToken(token: string | string[]): Promise<any> {
        try {
            const response = this.client.send<any>(
                {
                    cmd: 'verify-token'
                },
                token
            )
            return response.toPromise();
        } catch (exception) {
            throw exception;
        }
    }

}