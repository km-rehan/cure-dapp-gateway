import { Module } from "@nestjs/common";
import { ProfileController } from "src/controllers/profile.controller";
import { FileUploadModule } from "./fileupload.module";


@Module({
  controllers: [
    ProfileController
  ],
  exports: [],
  providers: [],
  imports: [
    FileUploadModule,
  ]
})
export class ProfileModule {}