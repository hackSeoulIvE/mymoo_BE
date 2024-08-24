import { ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { NotFoundError } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, 
    private readonly jwtService: JwtService,
  ){}

  async signin(signinDto: AuthDto.SignIn) {
    const { user_id, password } = signinDto;

    const user = await this.userService.findByUserId(user_id);
    if(!user) {
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요.');
    }
    
    const isSamePassword = bcrypt.compareSync(password, user.password);
    if(!isSamePassword) {
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요.');
    }

    const payload = { id: user.id, nickname: user.nickname };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.generateRefresh(user);

    await this.userService.updateRefresh(user, refreshToken, true);

    return {access_Token: accessToken, refresh_Token: refreshToken};
  }

  async signup(signupDto: AuthDto.SignUp) {
    const { user_id } = signupDto;

    const user = await this.userService.findByUserId(user_id);
    if(user) {
      throw new ForbiddenException('이미 존재하는 아이디입니다.');
    }

    const chknickname = await this.userService.findByNickname(signupDto.nickname);
    if(chknickname) {
      throw new ForbiddenException('이미 존재하는 닉네임입니다.');
    }

    return await this.userService.signup(signupDto);
  }


  async chkid(user_id: string) {
    const user = await this.userService.findByUserId(user_id);
    if(user) {
      throw new ForbiddenException('이미 존재하는 아이디입니다.');
    }
    return { message: '사용 가능한 아이디입니다.' }
  }

  async signout(user: User) {
    return await this.userService.updateRefresh(user, '', false);
  }

  private async generateRefresh(user: User) {

    const payload = { id: user.id};

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '1d',
    });

    return refreshToken;
  }

  async refreshToAccessToken(refreshToken: string) {
    const user = await this.userService.findByRefreshToken(refreshToken);
    
    if(!user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
    const payload = { id: user.id, nickname: user.nickname};

    const accessToken = this.jwtService.sign(payload);
    const newRefreshToken = await this.generateRefresh(user);

    await this.userService.updateRefresh(user, newRefreshToken, false);

    return {access_Token: accessToken, refresh_Token: newRefreshToken};
  }
}
