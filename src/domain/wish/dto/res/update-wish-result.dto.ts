import { PickType } from '@nestjs/swagger';
import { WishDto } from './wish.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateWishResultDto extends PickType(WishDto, [
  'id',
  'status',
  'createdAt',
  'updatedAt',
]) {}
