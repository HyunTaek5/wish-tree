import { IsEnum } from 'class-validator';
import { WishStatus } from '../../../../db/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWishStatusDto {
  @ApiProperty({
    enum: WishStatus,
    enumName: 'WishStatus',
    description: '승인/거절 상태',
    example: WishStatus.ACCEPTED,
  })
  @IsEnum(WishStatus)
  status: WishStatus;
}
