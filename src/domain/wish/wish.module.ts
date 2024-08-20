import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WishService } from './wish.service';

@Module({
  providers: [PrismaService, WishService],
  exports: [WishService],
})
export class WishModule {}
