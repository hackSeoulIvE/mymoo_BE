import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SendMailDto {
    @ApiProperty({
        example: 'wintery39@korea.ac.kr',
        description: 'user id',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    to: string;

    @ApiProperty({
        example: 'honggildong',
        description: 'user name',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    user: string;
}