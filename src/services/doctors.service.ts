import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

@Injectable()
export class DoctorsService {

  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://${REDIS_HOST}/${REDIS_PORT}`
    }
  })
  private client: ClientProxy;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

  }


  public async saveDoctorsProfile(): Promise<any> {
    try {
      const response = this.client.send<any>(
        {
          cmd: 'save-doctors-profile'
        },
        {}
      )
      return response.toPromise();
    } catch (exception) {
      throw exception;
    }
  }

}