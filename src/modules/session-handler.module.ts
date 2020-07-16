import { DynamicModule } from "@nestjs/common";
import { SessionModule } from "nestjs-session";
import * as ConnectRedis from "connect-redis";
import * as session from "express-session";
import { RedisService } from "nestjs-redis";
import { Redis } from "./redis.module";

const RedisStore = ConnectRedis(session);

const sessionSecret = process.env.SESSION_SECRET;

export const Session: DynamicModule = SessionModule.forRootAsync({
    imports: [
        Redis
    ],
    inject: [RedisService],
    useFactory: (redisService: RedisService) => {
        const redisClient = redisService.getClient();
        const store = new RedisStore({ client: redisClient as any });
        return {
        session: {
            store,
            secret: sessionSecret,
            saveUninitialized: true,
            resave: true,
            cookie: {
                secure: false,
                sameSite: "strict"
            }
        },
    };
    }
})