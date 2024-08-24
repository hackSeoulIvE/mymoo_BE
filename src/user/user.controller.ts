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

  @Get('/orderrecord')
  @ApiOperation({ summary: 'user 주문내역 조회' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  findOrderRecord(@Req() req: Request) {
    const { user }: any = req;
    return this.userService.findOrderRecord(user.id);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'user 삭제' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
