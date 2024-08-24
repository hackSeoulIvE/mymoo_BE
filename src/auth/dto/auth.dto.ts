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
            example: '홍길동',
            description: 'password',
        })
        @IsString()
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