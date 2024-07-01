import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ){}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async signin(signinDto: SigninDto) {
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
}
