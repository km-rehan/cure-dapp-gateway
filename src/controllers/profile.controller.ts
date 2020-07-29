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
import { request } from "http";



@Controller("api/profile")
export class ProfileController {


  constructor(private readonly profileService: ProfileService) {

  }

  @UseFilters(new HttpExceptionFilter())
  @Post("applyAsDoctor")
  public async applyAsDoctor(@Req() request: Request): Promise<any> {
    try {
      const userId = request["user"]["_id"];
    } catch (exception) {
      throw exception;
    }
  }

  @UseFilters(new HttpExceptionFilter())
  @Get("getUserProfile")
  public async getUserProfileData(@Req() request: Request): Promise<any> {
    try {
      const userId = request["user"]["_id"];
      const response = await this.profileService.getProfileDataForUser({ userId });
      return response;
    } catch (exception) {
      throw exception;
    }
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
      if (profileImage) {
        profileBody.avatar = profileImage.filename;
        const response = await this.profileService.saveUserProfileService(profileBody);
        return response;
      }
      const response = await this.profileService.saveUserProfileService(profileBody)
      return response;
    } catch (exception) {
      throw exception;
    } 
  }

  @UseFilters(new HttpExceptionFilter())
  @Get("getDoctorsProfile")
  public async getDoctorsProfile(@Req() request: Request): Promise<any> {
    try {
      const userId = request["user"]["_id"];
      const response = await this.profileService.getProfileDataForUser({ userId: userId });
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  @UseFilters(new HttpExceptionFilter())
  @Get("getProfile")
  public async getProfile(@Req() request: Request): Promise<any> {
    try {
      const userId = request["user"]["_id"];
      const response = await this.profileService.getProfileDataForUser({
        userId: userId
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  @UseFilters(new HttpExceptionFilter())
  @Post("saveDoctorsProfile")
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
  public async  saveDoctorsProfile(@UploadedFile() profileImage, @Body() profileBodyDto: ProfileBodyDto): Promise<any> {
    try {
      if (profileImage) {
        profileBodyDto.avatar = profileImage.filename
        const response = await this.profileService.saveDoctorsProfileService(profileBodyDto);
        return response;
      }
      const response = await this.profileService.saveDoctorsProfileService(profileBodyDto);
      return response;
    } catch (exception) {
      throw exception;
    }
  }
  
  @UseFilters(new HttpExceptionFilter())
  @Get('img/:imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() response: Response): void {
    return response.sendFile(image, { root: './files/profile' });
  }
}