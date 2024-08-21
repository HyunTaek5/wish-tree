import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentService } from '../domain/comment/comment.service';
import { CreateCommentDto } from '../domain/comment/dto/req/create-comment.dto';
import { CreateCommentResultDto } from '../domain/comment/dto/res/create-comment-result.dto';
import { GetCommentDto } from '../domain/comment/dto/req/get-comment.dto';
import {
  PaginatedResultDto,
  SwaggerPaginateResult,
} from '../domain/common/paginated-result.dto';
import { GetCommentResultDto } from '../domain/comment/dto/res/get-comment-result.dto';

@ApiTags('comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: '댓글 목록 (페이징) 조회',
    description:
      '댓글 목록을 조회합니다. 페이징 처리가 필요한 경우 query string으로 page, itemsPerPage를 전달합니다.',
    operationId: 'getComments',
  })
  @ApiOkResponse({
    description: '댓글 목록 조회 성공',
    type: GetCommentResultDto,
    isArray: true,
  })
  @ApiResponse({
    status: 2000,
    description: '댓글 페이징 목록 조회 성공',
    type: SwaggerPaginateResult<GetCommentResultDto>(GetCommentResultDto),
  })
  @Get()
  async getComments(
    @Query() dto: GetCommentDto,
  ): Promise<PaginatedResultDto<GetCommentResultDto> | GetCommentResultDto[]> {
    return this.commentService.getComments(dto);
  }

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

  @ApiOperation({
    summary: '댓글 삭제',
    description: '댓글을 삭제합니다.',
    operationId: 'deleteComment',
  })
  @Delete(':id')
  async deleteComment(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.commentService.deleteComment(id);
  }
}
