import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WishService } from '../domain/wish/wish.service';
import { CreateWishDto } from '../domain/wish/dto/req/create-wish.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateWishResultDto } from '../domain/wish/dto/res/create-wish-result.dto';
import { UpdateWishStatusDto } from '../domain/wish/dto/req/update-wish-status.dto';
import { UpdateWishResultDto } from '../domain/wish/dto/res/update-wish-result.dto';
import { GetWishDto } from '../domain/wish/dto/res/get-wish.dto';
import { GetPaginateWishDto } from '../domain/wish/dto/req/get-paginate-wish.dto';
import {
  PaginatedResult,
  SwaggerPaginateResult,
} from '../domain/common/paginated-result.dto';

@ApiTags('wish')
@Controller('wishes')
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @ApiOperation({
    summary: '소원 목록(페이징) 조회',
    description:
      '소원 목록을 조회합니다. 페이징 처리가 필요한 경우 query string으로 page, itemsPerPage를 전달합니다.',
    operationId: 'getWishes',
  })
  @ApiOkResponse({
    description: '소원 목록 조회 성공',
    type: GetWishDto,
    isArray: true,
  })
  @ApiResponse({
    status: 2000, // OkResponse 데코레이터 중복 적용 불가로 인한 Custom status code
    description: '소원 페이징 목록 조회 성공',
    type: SwaggerPaginateResult<GetWishDto>(GetWishDto),
    isArray: true,
  })
  @Get()
  async getWishes(
    @Query() dto: GetPaginateWishDto,
  ): Promise<PaginatedResult<GetWishDto> | GetWishDto[]> {
    return this.wishService.getWishes(dto);
  }

  @ApiOperation({
    summary: '소원 등록',
    description: '소원을 등록합니다.',
    operationId: 'createWish',
  })
  @Post()
  async createWish(@Body() dto: CreateWishDto): Promise<CreateWishResultDto> {
    return this.wishService.createWish(dto);
  }

  @ApiOperation({
    summary: '소원 단일 조회',
    description: '소원을 id로 단일 조회합니다.',
    operationId: 'getWishById',
  })
  @Get(':id')
  async getWishById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetWishDto> {
    return this.wishService.getWishById(id);
  }

  @ApiOperation({
    summary: '소원 승인/거절',
    description: '소원을 승인/거절합니다.',
    operationId: 'patchWishStatus',
  })
  @Patch(':id')
  async patchWishStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWishStatusDto,
  ): Promise<UpdateWishResultDto> {
    return this.wishService.patchWishStatus(id, dto);
  }

  @ApiOperation({
    summary: '소원 삭제',
    description: '소원을 삭제합니다.',
    operationId: 'deleteWish',
  })
  @Delete(':id')
  async deleteWish(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.wishService.deleteWish(id);
  }
}
