import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class createMeetingCommentDto {
    @ApiProperty({
         example: "This is a comment",
         description: 'The content of the comment',
    })
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        example: 1,
        description: 'The parent id of the comment',
    })
    parent_id: number;
}