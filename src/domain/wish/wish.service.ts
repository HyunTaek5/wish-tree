import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishDto } from './dto/req/create-wish.dto';
import { plainToInstance } from 'class-transformer';
import { CreateWishResultDto } from './dto/res/create-wish-result.dto';

@Injectable()
export class WishService {
  constructor(private readonly prisma: PrismaService) {}

  // 소원 등록
  async createWish(dto: CreateWishDto): Promise<CreateWishResultDto> {
    const wish = await this.prisma.wish.create({
      data: {
        title: dto.title,
        content: dto.content,
        category: dto.category,
      },
    });

    return plainToInstance(CreateWishResultDto, wish);
  }
}
