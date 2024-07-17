import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ){}

  async signin(signinDto: AuthDto.SignIn) {
    const { user_id, password } = signinDto;

    const user = await this.userService.findByUserId(user_id);
    if(!user) {
      return { message: '아이디 또는 비밀번호를 확인해주세요.' }
    }
    
    const isSamePassword = bcrypt.compareSync(password, user.password);
    if(!isSamePassword) {
      return { message: '아이디 또는 비밀번호를 확인해주세요.' }
    }

    const payload = { id: user.id};

    const accessToken = this.jwtService.sign(payload);

    return {access_Token: accessToken};
  }

  async signup(signupDto: AuthDto.SignUp) {
    const { user_id, password, email, nickname } = signupDto;

    const user = await this.userService.findByUserId(user_id);
    if(user) {
      return { message: '이미 존재하는 아이디입니다.' }
    }

    const userByNickname = await this.userService.findByNickname(nickname);
    if(userByNickname) {
      return { message: '이미 존재하는 닉네임입니다.' }
    }

    return await this.userService.signup(signupDto);
  }
}
