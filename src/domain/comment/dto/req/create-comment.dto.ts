import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  /**
   * 댓글 내용
   *
   * @example '댓글 내용입니다.'
   */
  @IsString()
  content: string;

  /**
   * 소원 ID
   *
   * @example 1
   */
  @IsNumber()
  wishId: number;
}
