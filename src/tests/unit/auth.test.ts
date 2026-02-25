import { isPasswordValid } from '@/lib/text-filter';

describe('isPasswordValid', () => {
  it('should return true for passwords >= 4 chars', () => {
    expect(isPasswordValid('1234')).toBe(true);
    expect(isPasswordValid('abcde')).toBe(true);
  });

  it('should return false for passwords < 4 chars', () => {
    expect(isPasswordValid('123')).toBe(false);
    expect(isPasswordValid('')).toBe(false);
  });
});
