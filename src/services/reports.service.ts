import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { MedicalReportsDto } from "src/dtos/medical-reports.dto";


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

  public async uploadMedicalReports(medicalReports: MedicalReportsDto): Promise<any> {
    try {
      const response = this.client.send<any>(
        {
          cmd: "upload-medical-reports"
        },
        medicalReports
      )
      return response.toPromise();
    } catch (exception) {
      throw exception;
    }

  }
}