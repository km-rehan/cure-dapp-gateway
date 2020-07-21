import { Controller, Post, UseFilters } from "@nestjs/common";
import { HttpExceptionFilter } from "src/filters/http-exception.filter";
import { AppointmentService } from "src/services/appointment.service";
import { AppointmentDto } from "../dtos/appointment.dto";


@Controller("appointment")
export class AppointmentController {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly appointmentService: AppointmentService) {

  }


  @UseFilters(new HttpExceptionFilter())
  @Post("book-appointment")
  public async bookAppointment(appointmentDto: AppointmentDto): Promise<any> {
    try {
      const response = await this.appointmentService.bookAppointment(appointmentDto);
      return response;
    } catch (exception) {
      throw exception;
    }
  }


  @UseFilters(new HttpExceptionFilter())
  @Post("book-online-appointment")
  public async bookOnlineAppointment(): Promise<any> {
    try {

    } catch (exception) {
      throw exception;
    }
  }
  
}