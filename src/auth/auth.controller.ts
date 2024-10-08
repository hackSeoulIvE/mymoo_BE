import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
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
  async signin(@Body() signinDto: AuthDto.SignIn, @Res({ passthrough: true }) res: Response): Promise<any> {
    const tokeninfo = await this.authService.signin(signinDto);
    
    res.cookie('refreshToken', tokeninfo.refresh_Token, { httpOnly: true});

    return {
      message: 'login success',
      access_token: tokeninfo.access_Token,
      refresh_token: tokeninfo.refresh_Token,
    };
  }

  @Post('Signup')
  @ApiOperation({ summary: '회원가입' })
  signup(@Body() signupDto: AuthDto.SignUp) {
    return this.authService.signup(signupDto);
  }

  @Post('Signout')
  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  async signout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { user }:any = req;
    await this.authService.signout(user);
    res.clearCookie('refreshToken');
    return res.send({ message: 'logout success' });
  }

  @Get('Checkid/:chk_user_id')
  @ApiOperation({ summary: '아이디 중복확인' })
  chkid(@Param('chk_user_id') chk_user_id: string) {
    return this.authService.chkid(chk_user_id);
  }

  @Get('Profile')
  @ApiOperation({ summary: 'user 정보' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  checkToken(@Req() req: Request) {
    const { user }:any = req;
    
    return {
      user_id : user.username, 
      user_name : user.nickname,
    };
  }

  @Post('Refresh')
  @ApiOperation({ summary: '토큰 재발급' })
  async refresh(@Body() refresh: AuthDto.Refresh, @Res({ passthrough: true }) res: Response) {
    const {access_Token, refresh_Token} = await this.authService.refreshToAccessToken(refresh.refreshToken);

    res.cookie('refreshToken', refresh_Token, { httpOnly: true});

    return {
      message: 'login success',
      access_token: access_Token,
      refresh_token: refresh_Token,
    };
  }
}
