import { LessThan, LessThanOrEqual, MoreThan, Not } from 'typeorm';

export const FILTER_MAPPER = {
  not: Not,
  less_than: LessThan,
  less_than_or_equal: LessThanOrEqual,
  more_than: MoreThan,
};
