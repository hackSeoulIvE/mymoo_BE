import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { Observable } from "rxjs";

@Injectable()
export class OptionalAuthGuard extends NestAuthGuard('jwt') {
    handleRequest(err, user, info, context: ExecutionContext) {
        return user;
    }
}