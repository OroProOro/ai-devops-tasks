const sum = require('./sum');

describe('sum', () => {
  test('dodaje 1 + 2 i zwraca 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('dodaje liczby ujemne', () => {
    expect(sum(-4, -6)).toBe(-10);
  });

  test('dodaje zero', () => {
    expect(sum(7, 0)).toBe(7);
  });
});
