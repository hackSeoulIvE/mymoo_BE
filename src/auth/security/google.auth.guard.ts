import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { Observable } from "rxjs";

@Injectable()
export class GoogleAuthGuard extends NestAuthGuard('google') {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const activate = await super.canActivate(context) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}