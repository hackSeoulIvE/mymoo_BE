import { ForbiddenException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { AuthDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async signup(signupDto: AuthDto.SignUp) {
    const user = new User();
    user.username = signupDto.user_id;
    user.password = signupDto.password;
    user.nickname = signupDto.nickname; 

    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findById(id: number) {
    return this.userRepository.findById(id);
  }

  findByUserId(user_id: string) {
    return this.userRepository.findByUserId(user_id);
  }

  findByNickname(nickname: string) {
    return this.userRepository.findByNickname(nickname);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
