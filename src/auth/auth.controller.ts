import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './security/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('Signin')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 401, description: '아이디 또는 비밀번호 틀림' })
  @ApiResponse({ status: 200, description: '그 외 정상적 응답' })
  signin(@Body() signinDto: AuthDto.SignIn) {
    return this.authService.signin(signinDto);
  }

  @Post('Signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 401, description: '존재하는 아이디 혹은 닉네임' })
  @ApiResponse({ status: 200, description: '그 외 정상적 응답' })
  signup(@Body() signupDto: AuthDto.SignUp) {
    return this.authService.signup(signupDto);
  }

  @Get('Checkid:chk_user_id')
  @ApiOperation({ summary: '아이디 중복확인' })
  @ApiResponse({ status: 403, description: '존재하는 아이디' })
  @ApiResponse({ status: 200, description: '사용 가능한 아이디' })
  chkid(@Param('chk_user_id') chk_user_id: string) {
    return this.authService.chkid(chk_user_id);
  }

  @Get('Checktoken')
  @ApiOperation({ summary: '토큰 확인' })
  @ApiResponse({ status: 401, description: '토큰이 유효하지 않음' })
  @ApiResponse({ status: 200, description: '토큰이 유효함' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  checkToken(@Req() req: Request) {
    return "인증된 토큰입니다.";
  }
}
