import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'honggildong',
        description: 'user id',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    user_id: string;

    @ApiProperty({
        example: '1q2w3e4r',
        description: 'password',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    password: string;
}
