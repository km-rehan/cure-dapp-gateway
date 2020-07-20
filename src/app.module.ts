import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigureModule } from "./modules/configure.module";
import { Session } from "./modules/session-handler.module";
import { AuthModule } from './modules/auth.module';
import { ProfileModule } from "./modules/profile.module";
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ConnectTimeoutMiddleware } from '@nest-middlewares/connect-timeout';
import { HeaderValidationMiddleware } from './middleware/headers.middleware';
import { AdminModule } from './modules/admin.module';
import { AppointmentModule } from './modules/appointment.module';
import { DoctorsModule } from './modules/doctors.module';
import { ReportsModule } from './modules/reports.module';


const unauthRoutes = [
  { path: `/api/profile`, method: RequestMethod.ALL }
];

@Module({
  imports: [
    ConfigureModule,
    Session,
    AuthModule,
    ProfileModule,
    AdminModule,
    AppointmentModule,
    DoctorsModule,
    ReportsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    HelmetMiddleware.configure({
      noSniff: true,
      xssFilter: true,
      dnsPrefetchControl: true,
      hidePoweredBy: true,
      expectCt: true,
      frameguard: {
        action: 'deny'
      }
    })
    ConnectTimeoutMiddleware.configure('25s', {
      respond: true
    });

    consumer.apply(HelmetMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    });

    consumer.apply(ConnectTimeoutMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })

    consumer.apply(HeaderValidationMiddleware)
      .forRoutes(...unauthRoutes)
  }
}
