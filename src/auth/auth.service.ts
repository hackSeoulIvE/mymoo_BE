import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { MailService } from 'src/mail/mail.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SocialSignupDto } from './dto/social.signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly mailService: MailService,  
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ){}

  async signin(signinDto: AuthDto.SignIn) {
    const { user_id, password } = signinDto;

    const user = await this.userService.findByUserId(user_id);
    if(!user) {
      return { message: '아이디 또는 비밀번호를 확인해주세요.' }
    }
    
    const isSamePassword = bcrypt.compareSync(password, user.password);
    if(!isSamePassword) {
      return { message: '아이디 또는 비밀번호를 확인해주세요.' }
    }

    const payload = { id: user.id};

    const accessToken = this.jwtService.sign(payload);

    return {access_Token: accessToken};
  }

  async signup(signupDto: AuthDto.SignUp) {
    const { user_id, password, email, nickname } = signupDto;

    const user = await this.userService.findByUserId(user_id);
    if(user) {
      return { message: '이미 존재하는 아이디입니다.' }
    }

    const userByNickname = await this.userService.findByNickname(nickname);
    if(userByNickname) {
      return { message: '이미 존재하는 닉네임입니다.' }
    }

    return await this.userService.signup(signupDto);
  }

  async chkid(user_id: string) {
    const user = await this.userService.findByUserId(user_id);
    if(user) {
      return { message: '이미 존재하는 아이디입니다.' }
    }
    return { message: '사용 가능한 아이디입니다.' }
  }

  async chknickname(nickname: string) {
    const user = await this.userService.findByNickname(nickname);
    if(user) {
      return { message: '이미 존재하는 닉네임입니다.' }
    }
    return { message: '사용 가능한 닉네임입니다.' }
  }

  async sendEmailVerify(email: string) {
    this.cacheManager.del(email);
    const user = await this.userService.findByEmail(email);
    if(user) {
      return { message: '이미 가입된 이메일입니다.' }
    }

    const verifynum = this.generateRandomNumber().toString();

    await this.cacheManager.set(email, verifynum+'new');
    await this.mailService.sendEmailVerify(email, verifynum, "가입 인증 메일");

    return { message: '이메일로 인증번호를 전송하였습니다.' }
  }

  async sendEmailForgotId(email: string) {
    this.cacheManager.del(email);
    const user = await this.userService.findByEmail(email);
    if(!user) {
      return { message: '가입되지 않은 이메일입니다.' }
    }

    const verifynum = this.generateRandomNumber().toString();

    await this.cacheManager.set(email, verifynum+'forgotid');
    await this.mailService.sendEmailVerify(email, verifynum, "아이디 찾기 인증 메일");

    return { message: '이메일로 인증번호를 전송하였습니다.' }
  }

  async sendEmailForgotPassword(userid:string, email: string) {
    this.cacheManager.del(email);
    const user = await this.userService.findByEmail(email);
    if(!user) {
      return { message: '가입되지 않은 이메일입니다.' }
    }
    
    if(user.user_id !== userid) {
      return { message: '아이디가 일치하지 않습니다.' }
    }

    const verifynum = this.generateRandomNumber().toString();

    await this.cacheManager.set(email, verifynum+'forgotpassword');
    await this.mailService.sendEmailVerify(email, verifynum, "비밀번호 찾기 인증 메일");

    return { message: '이메일로 인증번호를 전송하였습니다.' }
  }

  async verifyEmail(email: string, verifynum: string) {
    const cacheVerifynum = await this.cacheManager.get(email);

    if(!cacheVerifynum) {
      return { message: '인증번호가 만료되었거나 입력되지 않은 이메일입니다.' }
    }
    if(verifynum+'new' === cacheVerifynum) {
      await this.cacheManager.del(email);
      return { message: '인증되었습니다.' }
    } else {
      return { message: '인증번호가 일치하지 않습니다.' }
    }
  }

  async verifyForgotId(email: string, verifynum: string) {
    const cacheVerifynum = await this.cacheManager.get(email);
    let user = await this.userService.findByEmail(email);

    if(!cacheVerifynum) {
      return { message: '인증번호가 만료되었거나 입력되지 않은 이메일입니다.' }
    }
    if(verifynum+'forgotid' === cacheVerifynum) {
      await this.cacheManager.del(email);
      
      return { message: `인증되었습니다. 아이디는 ${user.user_id}입니다.` }
    } else {
      return { message: '인증번호가 일치하지 않습니다.' }
    }
  }

  async verifyForgotPassword(userid: string, email: string, verifynum: string) {
    const cacheVerifynum = await this.cacheManager.get(email);
    const user = await this.userService.findByEmail(email);

    if(user.user_id !== userid) {
      return { message: '아이디가 일치하지 않습니다.' }
    }

    if(!cacheVerifynum) {
      return { message: '인증번호가 만료되었거나 입력되지 않은 이메일입니다.' }
    }
    if(verifynum+'forgotpassword' === cacheVerifynum) {
      await this.cacheManager.del(email);
      const tempPassword = this.generateRandomNumber().toString();
      await this.userService.updatepassword(user, tempPassword);
      return { message: `인증되었습니다. 임시 비밀번호는 ${tempPassword}입니다. 반드시 비밀번호를 해주세요.` }
    } else {
      return { message: '인증번호가 일치하지 않습니다.' }
    }
  }


  async socialSignup(socialSignupdto: SocialSignupDto){
    const chkUser = await this.userService.findByEmail(socialSignupdto.email);

    if(chkUser) {
      if(chkUser.isSocialAccount) {
        return chkUser;
      }
      return { message: '이미 가입된 이메일입니다.' }
    }

    return await this.userService.socialSignup(socialSignupdto);
  }

  private generateRandomNumber(): number {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }
}
