import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/security/auth.guard';

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

  @Get('user_id/:user_id')
  @ApiOperation({ summary: 'user 주문 기록 조회' })
  findOrderRecord(@Param('user_id') user_id: string) {
    return this.userService.findOrderRecord(+user_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'user 삭제' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
