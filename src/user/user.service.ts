import { ForbiddenException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { AuthDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly orderService: OrderService,
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

  findOrderRecord(user_id: number) {
    return this.orderService.findOrderRecord(user_id);
  }

  async updateRefresh(user: User, refreshToken: string, changeexpired: boolean) {
    user.refreshtoken = refreshToken;
    if(changeexpired) {
      const now = new Date();
      const expires = new Date(now.getTime() + 24*60*60*1000);
      user.refreshTokenExpiresIn = expires;
    }
    return await this.userRepository.save(user);
  }

  async signout(user: User) {
    user.refreshtoken = null;
    user.refreshTokenExpiresIn = null;
    return await this.userRepository.save(user);
  }

  findByRefreshToken(refreshToken: string) {
    const result = this.userRepository.findByRefreshToken(refreshToken);
    if(!result) {
      throw new UnauthorizedException('Invalid token');
    }
    return result;
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
