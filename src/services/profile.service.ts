import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Request } from "express";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;

@Injectable()
export class ProfileService {
  
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

  public async saveUserProfileService(): Promise<any> {
    try {
      const response = await this.client.send<any>(
        { 
          cmd: ''
        },
        {}
      )
    } catch (exception) {
      throw exception;
    }
  }

}