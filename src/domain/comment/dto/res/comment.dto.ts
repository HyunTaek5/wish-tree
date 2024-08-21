import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  wishId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt: Date;

  @Expose()
  isDeleted: boolean;
}
