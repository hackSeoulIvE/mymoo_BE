import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateMeetingDto {
    @ApiProperty({
        example: 'Chicken Lovers',
        description: 'The name of the meeting',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    meeting_name: string;

    @ApiProperty({
        example: true,
        description: 'Whether the meeting is a flash meetup',
    })
    @IsNotEmpty()
    is_flash: boolean;

    @ApiProperty({
        example: 'honggildong',
        description: 'The user who created the meeting',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    created_by: string;

    @ApiProperty({
        example: '["honggildong", "heungbu", "nolbu"]',
        description: 'The users who are in the meeting',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(2047)
    meetingUsers: string;
}
