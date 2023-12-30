import { IsIn, IsNumber, IsOptional } from 'class-validator';

/**
 * cursor: where ~, order, take
 * page: page, order, take
 */

export class BasePaginateDto {
  @IsOptional()
  @IsNumber()
  where__id__less_than?: number;

  @IsOptional()
  @IsNumber()
  where__id__more_than?: number;

  // page pagination
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__createdAt: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsNumber()
  take: number = 20;
}
