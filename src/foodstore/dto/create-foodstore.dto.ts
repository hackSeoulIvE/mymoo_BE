import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFoodStoreDto {
  @IsString()
  @ApiProperty({ name: '가게 이름' })
  readonly name: string;

  @IsString()
  @ApiProperty({ name: '시작 시간' })
  readonly start_time: string;

  @IsString()
  @ApiProperty({ name: '종료 시간' })
  readonly end_time: string;

  @IsString()
  @ApiProperty({ name: '주소' })
  readonly location: string;

  @IsNumber()
  @ApiProperty({ name: '위도' })
  readonly latitude: number;

  @IsNumber()
  @ApiProperty({ name: '경도' })
  readonly longitude: number;

  @IsString()
  @ApiProperty({ name: '가게 분류' })
  readonly store_type: string;
}
