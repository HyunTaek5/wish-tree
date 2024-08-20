import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishDto } from './dto/req/create-wish.dto';
import { plainToInstance } from 'class-transformer';
import { CreateWishResultDto } from './dto/res/create-wish-result.dto';
import { kysely } from '../../db/kysely';

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

  // 소원 삭제
  async deleteWish(id: number): Promise<void> {
    await kysely.transaction().execute(async (tx) => {
      const targetWish = await tx
        .selectFrom('wish')
        .where('id', '=', id)
        .selectAll()
        .execute();

      if (!targetWish) {
        throw new NotFoundException('소원이 존재하지 않습니다.');
      }
    });

    await this.prisma.wish.update({
      where: { id: id },
      data: { deletedAt: new Date(), isDeleted: true },
    });
  }
}