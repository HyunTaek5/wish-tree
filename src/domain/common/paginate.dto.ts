import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginateDto {
  @ApiProperty({
    description: '페이지 번호',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    description: '페이지당 아이템 수',
    example: 30,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  itemsPerPage?: number;
}
