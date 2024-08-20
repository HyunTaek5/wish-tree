import { Module } from '@nestjs/common';
import { WishModule } from './domain/wish/wish.module';
import { WishController } from './controller/wish.controller';

@Module({
  imports: [WishModule],
  controllers: [WishController],
})
export class AppModule {}
