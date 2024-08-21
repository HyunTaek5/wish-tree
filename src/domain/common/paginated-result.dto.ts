import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export interface PaginatedResult<T> {
  items: T[];
  pagination: {
    totalItemCount: string;
    currentItemCount: number;
    totalPage: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export class PaginatedResultDto<T> implements PaginatedResult<T> {
  items: T[];
  pagination: {
    totalItemCount: string;
    currentItemCount: number;
    totalPage: number;
    currentPage: number;
    itemsPerPage: number;
  };

  constructor(
    items: T[],
    totalItemCount: string,
    currentPage: number,
    itemsPerPage: number,
  ) {
    const totalPage = Math.ceil(+totalItemCount / itemsPerPage);

    this.items = items;
    this.pagination = {
      totalItemCount,
      currentItemCount: items.length,
      totalPage: totalPage === 0 ? 1 : totalPage,
      currentPage,
      itemsPerPage,
    };
  }
}

export function SwaggerPaginateResult<E>(DtoClass: Type<E>) {
  class PaginatedHost<D> implements PaginatedResult<D> {
    @ApiProperty({ isArray: true, type: () => DtoClass })
    items: D[];

    pagination: {
      totalItemCount: string;
      currentItemCount: number;
      totalPage: number;
      currentPage: number;
      itemsPerPage: number;
    };

    constructor(
      items: D[],
      totalItemCount: string,
      currentPage: number,
      itemsPerPage: number,
    ) {
      const totalPage = Math.ceil(+totalItemCount / itemsPerPage);

      this.items = items;
      this.pagination = {
        totalItemCount,
        currentItemCount: items.length,
        totalPage: totalPage === 0 ? 1 : totalPage,
        currentPage,
        itemsPerPage,
      };
    }
  }

  return PaginatedHost;
}
