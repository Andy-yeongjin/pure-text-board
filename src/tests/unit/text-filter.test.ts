import { filterPlainText } from '@/lib/text-filter';

describe('filterPlainText', () => {
  it('should remove HTML tags', () => {
    const input = '<p>Hello <strong>World</strong></p>';
    const expected = 'Hello World';
    expect(filterPlainText(input)).toBe(expected);
  });

  it('should preserve plain text', () => {
    const input = `Simple text
with newlines`;
    expect(filterPlainText(input)).toBe(input);
  });

  it('should handle empty input', () => {
    expect(filterPlainText('')).toBe('');
  });
});
