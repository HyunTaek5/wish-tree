import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PrismaService } from '../prisma/prisma.service';
import { WishService } from '../wish/wish.service';

@Module({
  providers: [PrismaService, CommentService, WishService],
  exports: [CommentService],
})
export class CommentModule {}
