import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class SocialSignupDto {
    email: string;
    nickname: string;
    externalId: string;
}