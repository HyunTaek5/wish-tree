import { PickType } from '@nestjs/swagger';
import { WishDto } from './wish.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class GetWishDto extends PickType(WishDto, [
  'id',
  'title',
  'category',
  'createdAt',
]) {}
