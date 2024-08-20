import { PickType } from '@nestjs/swagger';
import { WishDto } from './wish.dto';

export class CreateWishResultDto extends PickType(WishDto, [
  'id',
  'title',
  'content',
  'category',
  'createdAt',
  'updatedAt',
]) {}
