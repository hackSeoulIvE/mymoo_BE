import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './security/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SigninDto } from './dto/signin-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('Signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Get('/authenticate')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  isAuth(@Req() req: Request): any {
    const { user }:any = req;
    return user;
  }


}
