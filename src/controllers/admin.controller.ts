import { Controller, Post, UseFilters } from "@nestjs/common";
import { DoctorServiceDto } from "src/dtos/doctor-service.dto";
import { DoctorTypeDto } from "src/dtos/doctor-type.dto";
import { HttpExceptionFilter } from "src/filters/http-exception.filter";
import { AdminService } from "src/services/admin.service";


@Controller("admin")
export class AdminController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly adminService: AdminService) {

  }

  @UseFilters(new HttpExceptionFilter())
  @Post("save-doctors-type")
  public async saveDoctorsType(doctorTypeDto: DoctorTypeDto): Promise<any> {
    try {
      const response = await this.adminService.saveDoctorsType(doctorTypeDto);
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  @UseFilters(new HttpExceptionFilter())
  @Post("save-doctors-services")
  public async saveDoctorsServices(doctorServiceDto: DoctorServiceDto): Promise<any> {
    try {
      const response = await this.adminService.saveDoctorsServices(doctorServiceDto);
      return response;
    } catch (exception) {
      throw exception;
    }
  }
}