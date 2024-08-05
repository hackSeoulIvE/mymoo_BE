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

  @Get('Checkid:chk_user_id')
  @ApiOperation({ summary: '아이디 중복확인' })
  chkid(@Param('chk_user_id') chk_user_id: string) {
    return this.authService.chkid(chk_user_id);
  }

  @Get('Checknickname:chk_nickname')
  @ApiOperation({ summary: '닉네임 중복확인' })
  chknickname(@Param('chk_nickname') chk_nickname: string) {
    return this.authService.chknickname(chk_nickname);
  }

  @Get('Checktoken')
  @ApiOperation({ summary: '토큰 확인' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  checkToken(@Req() req: Request) {
    return "인증된 토큰입니다.";
  }

  @Post('SendemailVerify')
  @ApiOperation({ summary: '이메일 인증번호 전송' })
  sendEmailVerify(@Body() emailDto: AuthDto.email) {
    return this.authService.sendEmailVerify(emailDto.email);
  }

  @Post('Verify')
  @ApiOperation({ summary: '이메일 인증번호 확인' })
  verify(@Body() verifyDto: AuthDto.checkEmail) {
    return this.authService.verifyEmail(verifyDto.email, verifyDto.verifynumber);
  }
}
