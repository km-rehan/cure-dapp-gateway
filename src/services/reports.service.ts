import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";


@Injectable()
export class ReportService {

  @Client({
    transport: Transport.REDIS,
    options: {
      url: ``
    }
  })
  client: ClientProxy;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

  }

  public async uploadMedicalReports(): Promise<any> {
    try {
      const response = this.client.send<any>(
        {
          cmd: "upload-medical-reports"
        },
        {}
      )
      return response.toPromise();
    } catch (exception) {
      throw exception;
    }

  }
}