import { ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { NotFoundError } from 'rxjs';
import { UserService } from 'src/user/user.service';

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

    const payload = { id: user.id};

    const accessToken = this.jwtService.sign(payload);


    return {access_Token: accessToken};
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
}
