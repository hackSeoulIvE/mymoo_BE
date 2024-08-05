import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { response } from 'express';
import { verify } from 'crypto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailVerify(user_email: string, verifynumber: string, title: string) {
    await this.mailerService
    .sendMail({
      to: user_email,
      subject: title,

      template: './emailverify',
      
      context: {
        code: 'cf1a3f828287',
        number: verifynumber,
      },
    })
    .catch((error) => {
      console.log(error);
    }); 
  }
}