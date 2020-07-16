import { Module } from "@nestjs/common";
import { ProfileController } from "src/controllers/profile.controller";
import { ProfileService } from "src/services/profile.service";
import { FileUploadModule } from "./fileupload.module";


@Module({
  controllers: [
    ProfileController
  ],
  exports: [ProfileService],
  providers: [ProfileService],
  imports: [
    FileUploadModule,
  ]
})
export class ProfileModule {}