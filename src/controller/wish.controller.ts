import { Body, Controller, Post } from '@nestjs/common';
import { WishService } from '../domain/wish/wish.service';
import { CreateWishDto } from '../domain/wish/dto/req/create-wish.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateWishResultDto } from '../domain/wish/dto/res/create-wish-result.dto';

@ApiTags('wish')
@Controller('wishes')
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @ApiOperation({
    summary: '소원 등록',
    description: '소원을 등록합니다.',
    operationId: 'createWish',
  })
  @Post()
  async createWish(@Body() dto: CreateWishDto): Promise<CreateWishResultDto> {
    return this.wishService.createWish(dto);
  }
}
