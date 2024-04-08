import { sum } from '../src/sum';

describe('Sum', () => {
  it('1 + 2의 결과는 3이다', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
