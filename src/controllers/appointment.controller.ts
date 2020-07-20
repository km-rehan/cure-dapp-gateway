import { Controller, Post, UseFilters } from "@nestjs/common";
import { HttpExceptionFilter } from "src/filters/http-exception.filter";


@Controller("appointment")
export class AppointmentController {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

  }


  @UseFilters(new HttpExceptionFilter())
  @Post("book-appointment")
  public async bookAppointment(): Promise<any> {
    try {

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