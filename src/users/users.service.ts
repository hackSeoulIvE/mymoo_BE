import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';
import { MeetingRepository } from 'src/meeting/meeting.repository';
import { DataSource } from 'typeorm';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { SocialSignupDto } from 'src/auth/dto/social.signup.dto';

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

    return await this.userRepository.save(user);
  }

  async socialSignup(socialSignupDto: SocialSignupDto) {
    const user = new User();
    
    user.email = socialSignupDto.email;
    user.nickname = socialSignupDto.nickname;
    user.isSocialAccount = true;
    user.externalId = socialSignupDto.externalId;

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

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  findByNickname(nickname: string) {
    return this.userRepository.findByNickname(nickname);
  }

  findMadeMeetings(user: User) {
    return this.userRepository.findMadeMeetings(user);
  }

  findPostedMeetings(user: User) {
    return this.userRepository.findPostedMeetings(user);
  }

  findLikedMeetings(user: User) {
    return this.userRepository.findLikedMeetings(user);
  }

  findAllMadeMeetings(user: User) {
    return this.userRepository.findAllMadeMeetings(user);
  }

  findAllPostedMeetings(user: User) {
    return this.userRepository.findAllPostedMeetings(user);
  }

  findAllMyComments(user: User) {
    return this.userRepository.findAllMyComments(user);
  }

  async remove(user: User) {
    return this.userRepository.delete(user.id);
  }
}
