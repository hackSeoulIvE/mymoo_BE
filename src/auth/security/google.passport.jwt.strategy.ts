import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { SocialSignupDto } from '../dto/social.signup.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly userService: UsersService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID, // CLIENT_ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // CLIENT_SECRET
      callbackURL: process.env.GOOGLE_REDIRECT_URL, // redirect_uri
      passReqToCallback: true,
      scope: ['profile'], // 가져올 정보들
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: any) {
    const { displayName, emails}= profile;
    const socialInfo: SocialSignupDto = {
      email: emails[0].value,
      nickname: displayName,
      externalId: profile.id,
    };

    try {
      const user = await this.userService.socialSignup(socialInfo);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}