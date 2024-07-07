import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class MeetingIdDto {
    @ApiProperty({
        example: 1,
        description: 'The id of the meeting',
    })
    @IsNotEmpty()
    meeting_id: number;
}