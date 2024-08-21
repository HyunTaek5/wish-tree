import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/req/create-comment.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCommentResultDto } from './dto/res/create-comment-result.dto';
import { WishService } from '../wish/wish.service';
import { WishStatus } from '../../db/enums';
import { GetCommentDto } from './dto/req/get-comment.dto';
import { GetCommentResultDto } from './dto/res/get-comment-result.dto';
import { kysely } from '../../db/kysely';
import { PaginatedResultDto } from '../common/paginated-result.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wishService: WishService,
  ) {}

  async createComment(dto: CreateCommentDto): Promise<CreateCommentResultDto> {
    const wish = await this.wishService.getIfWishExist(dto.wishId);

    if (wish.status === WishStatus.PENDING) {
      throw new BadRequestException('승인된 소원에만 댓글을 달 수 있습니다.');
    }

    const comment = await this.prisma.comment.create({
      data: {
        content: dto.content,
        wishId: dto.wishId,
      },
    });

    return plainToInstance(CreateCommentResultDto, comment);
  }

  async getComments(
    dto: GetCommentDto,
  ): Promise<PaginatedResultDto<GetCommentResultDto> | GetCommentResultDto[]> {
    const wish = await this.wishService.getIfWishExist(dto.wishId);

    if (wish.status === WishStatus.REJECTED) {
      throw new BadRequestException('거절된 소원의 댓글을 조회할 수 없습니다.');
    }

    if (dto.page && dto.itemsPerPage) {
      const offset = Number((dto.page - 1) * dto.itemsPerPage);
      const limit = Number(dto.itemsPerPage);

      const result = await kysely.transaction().execute(async (tx) => {
        const items = await tx
          .selectFrom('comment')
          .where('wishId', '=', dto.wishId)
          .where('isDeleted', '=', 0)
          .limit(limit)
          .offset(offset)
          .select(['id', 'content', 'createdAt'])
          .orderBy('createdAt', 'desc')
          .execute();

        const { count } = await tx
          .selectFrom('comment')
          .where('wishId', '=', dto.wishId)
          .where('isDeleted', '=', 0)
          .select((expressionBuilder) => {
            return expressionBuilder.fn.countAll().as('count');
          })
          .executeTakeFirstOrThrow();

        return new PaginatedResultDto<GetCommentResultDto>(
          plainToInstance(GetCommentResultDto, items),
          count.toString(),
          Number(dto.page),
          limit,
        );
      });

      return result;
    } else {
      const comments = await this.prisma.comment.findMany({
        where: {
          wishId: Number(dto.wishId),
          isDeleted: false,
        },
      });

      return plainToInstance(GetCommentResultDto, comments);
    }
  }
}
