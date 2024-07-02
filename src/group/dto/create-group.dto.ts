import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateGroupDto {
    @ApiProperty({
        example: 'Chicken Lovers',
        description: 'The name of the group',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    group_name: string;

    @ApiProperty({
        example: true,
        description: 'Whether the group is a flash meetup',
    })
    @IsNotEmpty()
    is_flash: boolean;

    @ApiProperty({
        example: 'honggildong',
        description: 'The user who created the group',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    created_by: string;

    @ApiProperty({
        example: '["honggildong", "heungbu", "nolbu"]',
        description: 'The users who are in the group',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(2047)
    groupUsers: string;
}
