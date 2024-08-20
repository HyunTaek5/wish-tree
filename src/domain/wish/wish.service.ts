import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishDto } from './dto/req/create-wish.dto';
import { plainToInstance } from 'class-transformer';
import { CreateWishResultDto } from './dto/res/create-wish-result.dto';
import { kysely } from '../../db/kysely';
import { UpdateWishStatusDto } from './dto/req/update-wish-status.dto';
import { WishStatus } from '../../db/enums';
import { UpdateWishResultDto } from './dto/res/update-wish-result.dto';
import { GetWishDto } from './dto/res/get-wish.dto';

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
    await this.getIfWishExist(id);

    await this.prisma.wish.update({
      where: { id: id },
      data: { deletedAt: new Date(), isDeleted: true },
    });
  }

  // 소원 승인/거절
  async patchWishStatus(
    id: number,
    dto: UpdateWishStatusDto,
  ): Promise<UpdateWishResultDto> {
    if (dto.status === WishStatus.PENDING) {
      throw new BadRequestException('승인/거절 상태로만 변경 가능합니다.');
    }

    await this.getIfWishExist(id);

    const updatedWish = await this.prisma.wish.update({
      where: { id: id },
      data: { status: dto.status },
    });

    return plainToInstance(UpdateWishResultDto, updatedWish);
  }

  // 소원 단일 조회
  async getWishById(id: number): Promise<GetWishDto> {
    const wish = await this.getIfWishExist(id);

    return plainToInstance(GetWishDto, wish);
  }

  async getIfWishExist(id: number) {
    const wish = await kysely.transaction().execute(async (tx) => {
      const targetWish = await tx
        .selectFrom('wish')
        .where('id', '=', id)
        .where('isDeleted', '=', 0)
        .selectAll()
        .executeTakeFirst();

      if (!targetWish) {
        throw new NotFoundException('소원이 존재하지 않습니다.');
      }

      return targetWish;
    });

    return wish;
  }
}
