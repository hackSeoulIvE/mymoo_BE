import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class createFoodstoreCommentDto {
    @ApiProperty({
        example: '맛있어요',
        description: 'description',
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: '1',
        description: 'foodstore_id',
    })
    foodstore_id: number;
}