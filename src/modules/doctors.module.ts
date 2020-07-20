import { Module } from "@nestjs/common";
import { DoctorsController } from "src/controllers/doctors.controller";
import { DoctorsService } from "src/services/doctors.service";
import { FileUploadModule } from "./fileupload.module";

@Module({
  controllers: [DoctorsController],
  exports: [DoctorsService],
  providers: [DoctorsService],
  imports: [FileUploadModule]
})
export class DoctorsModule {}