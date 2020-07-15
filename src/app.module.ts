import { Module } from '@nestjs/common';
import { ConfigureModule } from "./modules/configure.module";
import { Session } from "./modules/session-handler.module";
import { AuthModule } from './modules/auth.module';
import { ProfileModule } from "./modules/profile.module";

@Module({
  imports: [
    ConfigureModule,
    Session,
    AuthModule,
    ProfileModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
