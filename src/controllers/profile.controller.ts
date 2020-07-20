import {
  Controller,
  Post,
  Req,
  UseFilters,
  UseInterceptors,
  Body,
  UploadedFile,
  Res,
  Get,
  Param
} from "@nestjs/common";
import { Request, Response } from "express";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HttpExceptionFilter } from "../filters/http-exception.filter";
import { editFileName, imageFileFilter } from "../utils/file-uploading.util";
import { ProfileService } from "src/services/profile.service";
import { ProfileBodyDto } from "src/dtos/profile-body-dto";



@Controller("api/profile")
export class ProfileController {


  constructor(private readonly profileService: ProfileService) {

  }

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
  public async saveUserProfile(@UploadedFile() profileImage, @Body() profileBody: ProfileBodyDto, @Req() request: Request): Promise<any> {
    try {
      console.log("Profile image", profileImage)
      profileBody.avatar = profileImage.filename;
      const response = this.profileService.saveUserProfileService(profileBody);
      return response;
    } catch (exception) {
      throw exception;
    } 
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() response: Response): void {
    return response.sendFile(image, { root: './files/profile' });
  }
}