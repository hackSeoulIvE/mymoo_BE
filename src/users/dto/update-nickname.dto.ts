import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateUserNickDto {
    @ApiProperty({
        example: '홍길동아님',
        description: 'nickname',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nickname: string;
}