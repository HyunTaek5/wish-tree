import { Category } from '../../../../db/enums';
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWishDto {
  /**
   * 소원 제목
   *
   * @example '소원 제목을 입력하세요.'
   */
  @IsString()
  title: string;

  /**
   * 소원 내용
   *
   * @example '소원 내용을 입력하세요.'
   */
  @IsString()
  content: string;

  /**
   * 소원 카테고리
   *
   * @example 'DREAM'
   */
  @ApiProperty({ enum: Category, enumName: 'Category' })
  @IsEnum(Category)
  category: Category;
}
