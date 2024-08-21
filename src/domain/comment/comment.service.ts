import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/req/create-comment.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCommentResultDto } from './dto/res/create-comment-result.dto';
import { WishService } from '../wish/wish.service';
import { WishStatus } from '../../db/enums';

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
}
