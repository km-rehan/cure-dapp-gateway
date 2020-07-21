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
            if (!headers.authorization || headers.authorization === "") throw new HttpException("Unauthorized access to the site", HttpStatus.UNAUTHORIZED);
            const headerToken = headers.authorization;
            const authBody = {
                authToken: headerToken.split(" ")[1]
            }
            const user = await this.authService.verifyToken(authBody);
            request["user"] = user["payload"];
            next()
        } catch (exception) {
            throw exception;
        }
    }
}