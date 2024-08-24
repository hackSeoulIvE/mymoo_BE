import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateFoodStoreDto {
  @IsString()
  @ApiProperty({ name: '가게 이름' })
  readonly name: string;

  @IsNumber()
  @ApiProperty({ name: '시작 시간' })
  readonly start_Time: number;

  @IsString()
  @ApiProperty({ name: '종료 시간' })
  readonly end_Time: number;

  @IsString()
  @ApiProperty({ name: '위도' })
  readonly latitude: number;

  @IsBoolean()
  @ApiProperty({ name: '경도' })
  readonly longitude: number;

  @IsString()
  @ApiProperty({ name: '가게 분류' })
  readonly store_type: string;

  @IsString()
  @ApiProperty({ name: '위치' })
  readonly location: string;
}
