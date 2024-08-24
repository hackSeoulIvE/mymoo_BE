import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @ApiProperty({ name: '음식 이름' })
  readonly name: string;

  @IsNumber()
  @ApiProperty({ name: '가격' })
  readonly price: string;

  @IsString()
  @ApiProperty({ name: '할인 가격' })
  readonly discount_price: string;

  @IsString()
  @ApiProperty({ name: '상세정보' })
  readonly description: string;

  @IsBoolean()
  @ApiProperty({ name: '매진 여부' })
  readonly is_soldout: boolean;

  @IsString()
  @ApiProperty({ name: '음식 이미지' })
  readonly image_url: string;
}
