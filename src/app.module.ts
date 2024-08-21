import { Module } from '@nestjs/common';
import { WishModule } from './domain/wish/wish.module';
import { WishController } from './controller/wish.controller';
import { CommentModule } from './domain/comment/comment.module';
import { CommentController } from './controller/comment.controller';

@Module({
  imports: [CommentModule, WishModule],
  controllers: [CommentController, WishController],
})
export class AppModule {}
