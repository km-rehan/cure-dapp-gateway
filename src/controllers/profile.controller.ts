import {
  Controller,
  Post,
  Req,
  UseFilters,
  UseInterceptors,
  UploadedFiles,
  Body,
  UploadedFile,
  Res,
  Get,
  Param
} from "@nestjs/common";
import { Request, Response } from "express";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HttpExceptionFilter } from "../filters/http-exception.filter";
import { editFileName, imageFileFilter } from "../utils/file-uploading.util";



@Controller("api/profile")
export class ProfileController {

  @UseFilters(new HttpExceptionFilter())
  @Post("saveUserProfile")
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './files/profile',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 5242880
      }
    }),
  )
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async saveUserProfile(@UploadedFile() file, @Req() request: Request): Promise<any> {
    try {
      
    } catch (exception) {
      throw exception;
    } 
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() response: Response): void {
    return response.sendFile(image, { root: './files/profile' });
  }
}