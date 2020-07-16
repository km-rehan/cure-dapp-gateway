import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigureModule } from "./modules/configure.module";
import { Session } from "./modules/session-handler.module";
import { AuthModule } from './modules/auth.module';
import { ProfileModule } from "./modules/profile.module";
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ConnectTimeoutMiddleware } from '@nest-middlewares/connect-timeout';
import { HeaderValidationMiddleware } from './middleware/headers.middleware';

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
      .exclude(
        {
          path: "/api/auth/getUserSessionId",
          method: RequestMethod.ALL
        },
        {
          path: "/api/auth/verifyMessage",
          method: RequestMethod.ALL
        }
      )
      .forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
