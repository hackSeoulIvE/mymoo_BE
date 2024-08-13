import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateUserPwdDto {
    @ApiProperty({
        example: '1q2w3e4r',
        description: 'password',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nowpassword: string;

    @ApiProperty({
        example: '1q2w3e4r!',
        description: 'password',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    newpassword: string;
}