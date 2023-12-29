import { IsIn, IsNumber, IsOptional } from 'class-validator';

/**
 * where__id_more_than: 이전 마지막 데이터 ID
 * order__createdAt: 작성된 시간을 기준으로 정렬
 * take: 몇 개의 데이터를 응답으로 받을 지
 */
export class PaginatePostDto {
  @IsOptional()
  @IsNumber()
  where__id_less_than?: number;

  @IsOptional()
  @IsNumber()
  where__id_more_than?: number;

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__createdAt: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsNumber()
  take: number = 20;
}
