import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { AppointmentDto } from "../dtos/appointment.dto";


const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;

@Injectable()
export class AppointmentService {
  
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://${REDIS_HOST}/${REDIS_PORT}`
    }
  })
  client: ClientProxy;
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

  }

  public async bookAppointment(appointmentDto: AppointmentDto): Promise<any> {
    try {
      const response = this.client.send<any>(
        {
          cmd: "book-appointment"
        },
        appointmentDto
      )
      return response.toPromise(); 
    } catch (exception) {
      throw exception;
    }
  }
  
  public async bookOnlineAppointment(): Promise<any> {
    try {
      const response = this.client.send<any>(
        {
          cmd: "book-online-appointment"
        },
        {}
      )
      return response.toPromise();
    } catch (exception) {
      throw exception;
    }
  }
}