import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Category } from '../../../../db/enums';
import { ApiProperty } from '@nestjs/swagger';

export class SearchWishDto {
  /**
   * 검색어
   *
   * @example '소원'
   */
  @IsString()
  keyword: string;

  @ApiProperty({
    enum: Category,
    enumName: 'Category',
    example: Category.DREAM,
  })
  @IsEnum(Category)
  @IsOptional()
  category?: Category;
}
