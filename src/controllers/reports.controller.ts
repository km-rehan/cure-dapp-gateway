import { Controller, Post, UseInterceptors, UploadedFiles, UseFilters, Get, Param, Res } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { HttpExceptionFilter } from "src/filters/http-exception.filter";
import { diskStorage } from "multer";
import { editFileName } from "src/utils/file-uploading.util";
import { Request, Response } from "express";

@Controller("reports")
export class ReportsController {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

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
  public async uploadMedicalReports(@UploadedFiles() reports): Promise<any> {
    try {

    } catch (exception) {
      throw exception;
    }
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() response: Response): void {
    return response.sendFile(image, { root: './files/reports' });
  }
  
}