import { Module } from "@nestjs/common";
import { AdminController } from "src/controllers/admin.controller";
import { AdminService } from "src/services/admin.service";
import { FileUploadModule } from "./fileupload.module";

@Module({
  controllers: [AdminController],
  exports: [AdminService],
  providers: [AdminService],
  imports: [FileUploadModule]
})
export class AdminModule {}