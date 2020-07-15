import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { HeaderValidationMiddleware } from "src/middleware/headers.middleware";
import { AuthController } from "../controllers/auth.controller";


@Module({
    controllers: [AuthController],
    imports: [],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule implements NestModule {

    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(HeaderValidationMiddleware)
            .forRoutes(AuthController)
    }
}