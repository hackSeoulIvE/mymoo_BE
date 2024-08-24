import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class createFoodStoreFoodDto {
    @ApiProperty({
        example: '떡볶이',
        description: 'name',
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: '5,000원',
        description: 'price',
    })
    @IsString()
    price: string;

    @ApiProperty({
        example: '4,000원',
        description: 'discount_price',
    })
    @IsString()
    discount_price: string;

    @ApiProperty({
        example: '맛있는 떡볶이 입니다. 영양성분 ~~',
        description: 'description',
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: 'true',
        description: 'is_soldout',
    })
    is_soldout: boolean;

    @ApiProperty({
        example: 'image.png',
        description: 'image_url',
    })
    @IsString()
    image_url: string;

    @ApiProperty({
        example: '1',
        description: 'foodstore_id',
    })
    foodstore_id: number;
}