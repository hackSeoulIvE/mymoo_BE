import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { MeetingRepository } from 'src/meeting/meeting.repository';
import { MeetingModule } from 'src/meeting/meeting.module';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, UsersRepository],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
