import { DynamicModule } from "@nestjs/common";
import { RedisModule, RedisModuleOptions } from "nestjs-redis";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;

export const Redis: DynamicModule = RedisModule.forRootAsync({
    useFactory: (): RedisModuleOptions => {
        return {
            host: REDIS_HOST,
            port: REDIS_PORT
        }
    }
})