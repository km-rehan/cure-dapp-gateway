import { Catch, ConflictException, Injectable } from "@nestjs/common";
import { Client, ClientProxy, RedisContext, Transport } from "@nestjs/microservices";
import { Request } from "express";
import { from } from "rxjs";
import { ProfileBodyDto } from "src/dtos/profile-body-dto";
import { } from "@nestjs/microservices";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;

@Injectable()
export class ProfileService {
  
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
      connect_timeout: 100,
      socket_keepalive: true,
      retry_unfulfilled_commands: false,
      retryAttempts: 2,
      retryDelay: 500
    },
  })
  client: ClientProxy;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    
  }

  public async saveUserProfileService(profileBodyDto: ProfileBodyDto): Promise<any> {
    try {
      const response = await this.client.send<any>(
        { 
          cmd: 'update-user-profile'
        },
        profileBodyDto
      )
      return response.toPromise();
    } catch (exception) {
      throw exception;
    }
  }

}