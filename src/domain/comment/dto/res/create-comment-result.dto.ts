import { PickType } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateCommentResultDto extends PickType(CommentDto, [
  'id',
  'content',
  'createdAt',
]) {}
