import { Controller, Post, UseInterceptors, UploadedFiles, UseFilters, Get, Param, Res, Body } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { HttpExceptionFilter } from "src/filters/http-exception.filter";
import { diskStorage } from "multer";
import { editFileName } from "src/utils/file-uploading.util";
import { Request, Response } from "express";
import { MedicalReportsDto } from "src/dtos/medical-reports.dto";
import { ReportService } from "src/services/reports.service";

@Controller("reports")
export class ReportsController {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly reportServices: ReportService) {

  }

  @UseFilters(new HttpExceptionFilter())
  @Post("upload-medical-reports")
  @UseInterceptors(
    FilesInterceptor('reports[]', 20,  {
      storage: diskStorage({
        destination: './files/reports',
        filename: editFileName,
      }),
      limits: {
        fileSize: 5242880
      }
    }),
  )
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async uploadMedicalReports(@UploadedFiles() reports, @Body() medicalReports: MedicalReportsDto): Promise<any> {
    try {
      if (!reports || reports.length === 0) {
        const response = await this.reportServices.uploadMedicalReports(medicalReports);
        return response;
      }
      reports.forEach(report => medicalReports.reports.push(report.filename));
      const response =  await this.reportServices.uploadMedicalReports(medicalReports);
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  @Get('files/:filesPath')
  seeUploadedFile(@Param('filesPath') image: string, @Res() response: Response): void {
    return response.sendFile(image, { root: './files/reports' });
  }
  
}