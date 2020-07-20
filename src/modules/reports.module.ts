import { Module } from "@nestjs/common";
import { ReportsController } from "src/controllers/reports.controller";
import { ReportService } from "src/services/reports.service";
import { FileUploadModule } from "./fileupload.module";


@Module({
  controllers: [ReportsController],
  exports: [ReportService],
  providers: [ReportService],
  imports: [FileUploadModule]
})
export class ReportsModule { }