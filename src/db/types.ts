import type { ColumnType } from 'kysely';
import type { Category, WishStatus } from './enums';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Comment = {
  id: Generated<number>;
  content: string;
  wishId: number;
  createdAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
  isDeleted: Generated<number>;
};
export type Wish = {
  id: Generated<number>;
  title: string;
  content: string;
  category: Category;
  status: Generated<WishStatus>;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
  isDeleted: Generated<number>;
};
export type DB = {
  comment: Comment;
  wish: Wish;
};
