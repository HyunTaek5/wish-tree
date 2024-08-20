import { Category, WishStatus } from '../../../../db/enums';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class WishDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @ApiProperty({ enum: Category, enumName: 'Category' })
  @Expose()
  category: Category;

  @ApiProperty({ enum: WishStatus, enumName: 'WishStatus' })
  @Expose()
  status: WishStatus;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
