import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export namespace AuthDto {
    export class checkID {
        @ApiProperty({
            example: 'honggildong',
            description: 'user_id',
        })
        @Length(4, 20)
        @IsString()
        user_id: string;
    }

    export class checkPassword {
        @ApiProperty({
            example: '12345678!',
            description: 'user_password',
        })
        @Length(4, 20)
        @IsString()
        user_password: string;
    }

    export class email {
        @ApiProperty({
            example: "wintery39@korea.ac.kr",
            description: 'user_email',
        })
        email: string;
    }
    export class checkEmail {
        @ApiProperty({
            example: "wintery39@korea.ac.kr",
            description: 'user_email',
        })
        email: string;
        @ApiProperty({
            example: '524372',
            description: 'verify number',
        })
        @IsString()
        verifynumber: string;
    }

    export class forgotPassword {
        @ApiProperty({
            example: "honggildong",
            description: 'user_id',
        })
        @IsString()
        user_id: string;

        @ApiProperty({
            example: "wintery39@korea.ac.kr",
            description: 'user_email',
        })
        email: string;
    }

    export class checkForgotPassword {
        @ApiProperty({
            example: "honggildong",
            description: 'user_id',
        })
        @IsString()
        user_id: string;

        @ApiProperty({
            example: "wintery39@korea.ac.kr",
            description: 'user_email',
        })
        email: string;
        @ApiProperty({
            example: '524372',
            description: 'verify number',
        })
        @IsString()
        verifynumber: string;
    }


    export class SignUp {
        @ApiProperty({
            example: 'honggildong',
            description: 'user_id',
        })
        @IsString()
        user_id: string;

        @ApiProperty({
            example: '1q2w3e4r',
            description: 'password',
        })
        @IsString()
        @Length(4, 20)
        password: string;

        @ApiProperty({
            example: 'thisisemail@email.co.kr',
            description: 'email',
        })
        @IsNotEmpty()
        @IsString()
        @MaxLength(100)
        email: string;

        @ApiProperty({
            example: '홍길동123',
            description: 'nickname',
        })
        @IsString()
        @Length(4, 20)
        nickname: string;
    }

    export class SignIn {
        @ApiProperty({
            example: 'honggildong',
            description: 'user_id',
        })
        @IsString()
        @Length(4, 20)
        user_id: string;

        @ApiProperty({
            example: '1q2w3e4r',
            description: 'password',
        })
        @IsString()
        @Length(4, 20)
        password: string;
    }

    export class Refresh {
        @ApiProperty({
            example: 'refreshToken',
            description: 'refreshToken',
        })
        @IsString()
        refreshToken: string;
    }
}