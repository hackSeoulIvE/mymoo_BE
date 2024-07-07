import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';
import { MeetingRepository } from 'src/meeting/meeting.repository';
import { DataSource } from 'typeorm';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
  ) {}

  async signup(signupDto: AuthDto.SignUp) {
    const user = new User();
    user.user_id = signupDto.user_id;
    user.password = signupDto.password; 
    user.email = signupDto.email;
    user.nickname = signupDto.nickname;
    user.made_meeting = JSON.stringify([]);
    user.posted_meeting = JSON.stringify([]);
    user.liked_meeting = JSON.stringify([]);

    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findById(id);
  }

  findByUserId(user_id: string) {
    return this.userRepository.findByUserId(user_id);
  }

  findByNickname(nickname: string) {
    return this.userRepository.findByNickname(nickname);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
