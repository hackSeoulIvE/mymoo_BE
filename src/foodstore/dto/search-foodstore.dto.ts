import { ApiProperty } from "@nestjs/swagger";


export class SearchFoodstoreDto {
    @ApiProperty({
        example: '35.134',
        description: 'longitude',
    })
    longitude: number;

    @ApiProperty({
        example: '129.134',
        description: 'latitude',
    })
    latitude: number;
}