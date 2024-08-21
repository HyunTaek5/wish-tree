import { PaginateDto } from '../../../common/paginate.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCommentDto extends PaginateDto {
  @IsNumber()
  @Type(() => Number)
  wishId: number;
}
