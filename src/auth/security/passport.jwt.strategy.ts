import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";

import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    })
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<User> {
    const { id } = payload
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new UnauthorizedException({ message: '회원 존재하지 않음.' });
    }

    return done(null, user);
  }
}

export interface Payload {
  id: number;
  //role:string
}