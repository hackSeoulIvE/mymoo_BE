import { Delete } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreateDateColumn, DeleteDateColumn } from "typeorm";

export class CreateFoodStoreDto {
    @ApiProperty({
            example: '맛있는 떡볶이',
            description: 'store name',
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: '22:00',
        description: 'start time',
    })
    @IsString()
    start_Time: string;

    @ApiProperty({
        example: '23:00',
        description: 'end time',
    })
    @IsString()
    end_Time: string;

    @ApiProperty({
        example: '서울시 강남구',
        description: 'address',
    })
    @IsString()
    location: string;

    @ApiProperty({
        example: '36.23123',
        description: 'longitude',
    })
    longitude: number;

    @ApiProperty({
        example: '127.123123',
        description: 'latitude',
    })
    latitude: number;

    @ApiProperty({
        example: '카페',
        description: 'store type',
    })
    @IsString()
    store_type: string;

    @ApiProperty({
        example: 'true',
        description: 'is open',
    })
    is_open: boolean;
}
