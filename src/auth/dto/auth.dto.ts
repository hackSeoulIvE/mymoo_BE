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

    export class checkEmail {
        @ApiProperty({
            example: 1,
            description: 'user_id',
        })
        id: number;
        @ApiProperty({
            example: '524372',
            description: 'code',
        })
        @IsString()
        code: string;
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
}