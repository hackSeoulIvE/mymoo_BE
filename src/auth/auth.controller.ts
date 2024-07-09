import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './security/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('Signin')
  @ApiOperation({ summary: '로그인' })
  signin(@Body() signinDto: AuthDto.SignIn) {
    return this.authService.signin(signinDto);
  }

  @Post('Signup')
  @ApiOperation({ summary: '회원가입' })
  signup(@Body() signupDto: AuthDto.SignUp) {
    return this.authService.signup(signupDto);
  }
}
