import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from '../domain/comment/comment.service';
import { CreateCommentDto } from '../domain/comment/dto/req/create-comment.dto';
import { CreateCommentResultDto } from '../domain/comment/dto/res/create-comment-result.dto';

@ApiTags('comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: '댓글 등록',
    description: '댓글을 등록합니다.',
    operationId: 'createComment',
  })
  @Post()
  async createComment(
    @Body() dto: CreateCommentDto,
  ): Promise<CreateCommentResultDto> {
    return this.commentService.createComment(dto);
  }
}
