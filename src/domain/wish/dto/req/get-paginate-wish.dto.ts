import { IsEnum } from 'class-validator';
import { WishStatus } from '../../../../db/enums';
import { ApiProperty } from '@nestjs/swagger';
import { PaginateDto } from '../../../common/paginate.dto';

export class GetPaginateWishDto extends PaginateDto {
  @ApiProperty({ enum: WishStatus, enumName: 'WishStatus' })
  @IsEnum(WishStatus)
  status: WishStatus;
}
