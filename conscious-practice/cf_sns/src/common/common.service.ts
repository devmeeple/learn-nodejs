import { BadRequestException, Injectable } from '@nestjs/common';
import { BasePaginateDto } from './dto/base-paginate.dto';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseEntity } from './entities/base.entity';
import { FILTER_MAPPER } from './const/filter-mapper.const';
import { HOST, PROTOCOL } from './const/env.const';

@Injectable()
export class CommonService {
  paginate<T extends BaseEntity>(
    basePaginate: BasePaginateDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {
    if (basePaginate.page) {
      return this.pagePaginate(basePaginate, repository, overrideFindOptions);
    } else {
      return this.cursorPaginate(
        basePaginate,
        repository,
        overrideFindOptions,
        path,
      );
    }
  }

  private async cursorPaginate<T extends BaseEntity>(
    basePaginate: BasePaginateDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {
    const findOptions = this.composeFindOptions<T>(basePaginate);
    const result = await repository.find({
      ...findOptions,
      ...overrideFindOptions,
    });

    const lastItem =
      result.length > 0 && result.length === basePaginate.take
        ? result[result.length - 1]
        : null;

    const nextURL = lastItem && new URL(`${PROTOCOL}://${HOST}/${path}`);

    if (nextURL) {
      for (const key of Object.keys(basePaginate)) {
        if (basePaginate[key]) {
          if (key !== 'where__id_more_than' && key !== 'where__id_less_than') {
            nextURL.searchParams.append(key, basePaginate[key]);
          }
        }
      }

      let key = null;

      if (basePaginate.order__createdAt === 'ASC') {
        key = 'where__id_more_than';
      } else {
        key = 'where__id_less_than';
      }

      nextURL.searchParams.append(key, lastItem.id.toString());
    }

    return {
      data: result,
      cursor: {
        after: lastItem?.id ?? null,
      },
      count: result.length,
      next: nextURL?.toString() ?? null,
    };
  }

  /**
   * where, order, take, (skip?)
   * @param basePaginate
   * @private
   */
  private composeFindOptions<T extends BaseEntity>(
    basePaginate: BasePaginateDto,
  ): FindManyOptions<T> {
    let where: FindOptionsWhere<T> = {};
    let order: FindOptionsOrder<T> = {};

    for (const [key, value] of Object.entries(basePaginate)) {
      if (key.startsWith('where__')) {
        where = {
          ...where,
          ...this.parseWhereFilter(key, value),
        };
      } else if (key.startsWith('order__')) {
        order = {
          ...order,
          ...this.parseWhereFilter(key, value),
        };
      }
    }
    return {
      where,
      order,
      take: basePaginate.take,
      skip: basePaginate.page
        ? basePaginate.take * (basePaginate.page - 1)
        : null,
    };
  }

  private parseWhereFilter<T extends BaseEntity>(
    key: string,
    value: any,
  ): FindOptionsWhere<T> | FindOptionsOrder<T> {
    const options: FindOptionsWhere<T> = {};

    const split = key.split('__');

    if (split.length !== 2 && split.length !== 3) {
      throw new BadRequestException(
        `where 필터는 '__'로 필터링했을 때 길이가 2 또는 3이어야 합니다. 문제 되는 키:${key}`,
      );
    }

    if (split.length === 2) {
      const [, field] = split;
      options[field] = value;
    } else {
      const [, field, operator] = split;
      if (operator === 'i_like') {
        options[field] === FILTER_MAPPER[operator](`%${value}%`);
      } else {
        options[field] = FILTER_MAPPER[operator](value);
      }
    }
    return options;
  }

  private async pagePaginate<T extends BaseEntity>(
    basePaginate: BasePaginateDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
  ) {
    const findOptions = this.composeFindOptions<T>(basePaginate);
    const [data, count] = await repository.findAndCount({
      ...findOptions,
      ...overrideFindOptions,
    });

    return {
      data,
      total: count,
    };
  }
}
