import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString, MaxLength } from "class-validator";

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
        example: 'A meeting for chicken lovers',
        description: 'The description of the meeting',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(2047)
    meeting_description: string;

    @ApiProperty({
        example: 'play',
        description: 'The type of the meeting',
    })
    @IsIn(['play', 'eat', 'extra', 'study'])
    type: string;

    @ApiProperty({
        example: '2024-12-31T23:59:59.000',
        description: 'The deadline of the meeting',
    })
    @IsNotEmpty()
    deadline: Date;

    @ApiProperty({
        example: '2024-12-31T23:59:59.000',
        description: 'The date of the meeting',
    })
    @IsNotEmpty()
    meeting_date: Date;

    @ApiProperty({
        example: 1,
        description: 'The minimum number of users in the meeting',
    })
    @IsNotEmpty()
    min_user: number;

    @ApiProperty({
        example: 10,
        description: 'The maximum number of users in the meeting',
    })
    @IsNotEmpty()
    max_user: number;
}
