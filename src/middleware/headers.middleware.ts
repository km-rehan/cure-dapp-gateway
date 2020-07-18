import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express"
import * as _ from "lodash";
import { AuthService } from "src/services/auth.service";


@Injectable()
export class HeaderValidationMiddleware implements NestMiddleware {

    constructor(private readonly authService: AuthService) {

    }

    async use(request: Request, response: Response, next: () => void): Promise<any> {
        try {
            const headers = request.headers;
            console.log("Headers", JSON.stringify(headers, null, 3));
            if (headers["AuthToken"] || headers["AuthToken"] === "") throw new HttpException("Unauthorized access to the site", HttpStatus.UNAUTHORIZED);
            const headerToken = headers["AuthToken"];
            const user = await this.authService.verifyToken(headerToken);
            request["user"] = user;
            next()
        } catch (exception) {
            throw exception;
        }
    }
}