import { ApiProperty } from "@nestjs/swagger";

export class FoodIdDto {
    @ApiProperty({
        example: '1',
        description: 'food_id',
    })
    food_id: number;
}