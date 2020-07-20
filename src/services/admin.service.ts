import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { DoctorServiceDto } from "src/dtos/doctor-service.dto";
import { DoctorTypeDto } from "src/dtos/doctor-type.dto";


const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;

@Injectable()
export class AdminService {
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
  }


  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://${REDIS_HOST}/${REDIS_PORT}`
    }
  })
  client: ClientProxy;
  

  public async saveDoctorsType(doctorTypeDto: DoctorTypeDto): Promise<any> {
    try {
      const response = this.client.send<any>(
        {
          cmd: "save-doctors-type"
        },
        doctorTypeDto
      )

      return response.toPromise();
    } catch (exception) {
      throw exception;
    }
  }

  public async saveDoctorsServices(doctorServiceDto: DoctorServiceDto): Promise<any> {
    try {
      const response = this.client.send<any>(
        {
          cmd: "save-doctors-services"
        },
        doctorServiceDto
      )
      return response.toPromise();
    } catch (exception) {
      throw exception;
    }
  }
}