import { Module } from "@nestjs/common";
import { AppointmentController } from "src/controllers/appointment.controller";
import { AppointmentService } from "src/services/appointment.service";
import { FileUploadModule } from "./fileupload.module";

@Module({
  controllers: [AppointmentController],
  exports: [AppointmentService],
  imports: [FileUploadModule],
  providers: [AppointmentService]
})
export class AppointmentModule { }