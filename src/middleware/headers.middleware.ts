import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express"


@Injectable()
export class HeaderValidationMiddleware implements NestMiddleware {

    use(request: Request, response: Response, next: () => void): any {
        console.log("request headers", JSON.stringify(request.headers, null, 3));
        next()
    }
}