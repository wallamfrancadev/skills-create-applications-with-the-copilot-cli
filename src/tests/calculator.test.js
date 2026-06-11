const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('Calculator basic operations', () => {
  test('2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow('Division by zero');
  });

  // Extended operations from image: modulo, power, square root
  test('5 % 2 = 1 (modulo)', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('2 ^ 3 = 8 (power)', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('squareRoot(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  // Edge cases
  test('modulo by zero throws', () => {
    expect(() => modulo(1, 0)).toThrow('Modulo by zero');
  });

  test('square root of negative throws', () => {
    expect(() => squareRoot(-9)).toThrow('Square root of negative number');
  });
});
