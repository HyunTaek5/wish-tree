import { PickType } from '@nestjs/swagger';
import { WishDto } from './wish.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateWishResultDto extends PickType(WishDto, [
  'id',
  'title',
  'content',
  'category',
  'createdAt',
  'updatedAt',
]) {}
