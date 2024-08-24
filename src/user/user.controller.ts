import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'user 전체 조회' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'user id 조회' })
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'user 삭제' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
