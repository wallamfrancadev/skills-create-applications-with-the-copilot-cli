#!/usr/bin/env node
/*
 Node.js CLI Calculator
 Supported operations:
 - Addition
 - Subtraction
 - Multiplication
 - Division
 - Modulo
 - Exponentiation (power)
 - Square root

 Usage:
   node src/calculator.js add 2 3
   node src/calculator.js 2 + 3
   node src/calculator.js mod 5 2
   node src/calculator.js 2 ^ 3
   node src/calculator.js sqrt 9
   node src/calculator.js 9 sqrt
*/

// Basic arithmetic functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    // Handle division by zero gracefully
    throw new Error('Division by zero');
  }
  return a / b;
}

// Modulo
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero');
  }
  return a % b;
}

// Exponentiation (power)
function power(a, b) {
  return Math.pow(a, b);
}

// Square root (unary)
function sqrt(a) {
  if (a < 0) {
    throw new Error('Square root of negative number');
  }
  return Math.sqrt(a);
}

module.exports = { add, subtract, multiply, divide, modulo, power, sqrt };

// CLI entrypoint
if (require.main === module) {
  const argv = process.argv.slice(2);

  if (argv.length === 0) {
    console.error('Usage: node src/calculator.js <op> <a> <b>\nOr: node src/calculator.js <a> <symbol> <b>\nUnary: node src/calculator.js sqrt <a>');
    process.exit(1);
  }

  // Helper to detect if a token is an operation
  const opNames = new Set(['add','subtract','multiply','divide','mod','%', 'power','pow','^','**','sqrt','+','-','*','x','X','/']);

  let opKey = null;
  let aStr = null;
  let bStr = null;

  if (argv.length === 1) {
    console.error('Insufficient arguments. Provide an operation and operand(s).');
    process.exit(1);
  } else if (argv.length === 2) {
    // Could be: op a  OR  a op (for unary op like sqrt)
    if (opNames.has(argv[0].toString())) {
      opKey = argv[0];
      aStr = argv[1];
    } else if (opNames.has(argv[1].toString())) {
      opKey = argv[1];
      aStr = argv[0];
    } else {
      console.error('Invalid input. Example: node src/calculator.js sqrt 9  OR  node src/calculator.js 9 sqrt');
      process.exit(2);
    }
  } else {
    // argv.length >= 3: could be op a b  OR  a op b
    if (opNames.has(argv[0].toString())) {
      opKey = argv[0];
      aStr = argv[1];
      bStr = argv[2];
    } else {
      aStr = argv[0];
      opKey = argv[1];
      bStr = argv[2];
    }
  }

  // Normalize opKey to function name
  const opMap = {
    '+': 'add',
    'add': 'add',
    '-': 'subtract',
    'subtract': 'subtract',
    '*': 'multiply',
    'x': 'multiply',
    'X': 'multiply',
    'multiply': 'multiply',
    '/': 'divide',
    'divide': 'divide',
    '%': 'modulo',
    'mod': 'modulo',
    'modulo': 'modulo',
    '^': 'power',
    '**': 'power',
    'pow': 'power',
    'power': 'power',
    'sqrt': 'sqrt'
  };

  const key = (opKey || '').toString();
  const fnName = opMap[key];

  try {
    if (!fnName) {
      throw new Error('Unsupported operation');
    }

    let result;

    if (fnName === 'sqrt') {
      const a = Number(aStr);
      if (Number.isNaN(a)) throw new Error('Invalid numeric input');
      result = sqrt(a);
    } else {
      const a = Number(aStr);
      const b = Number(bStr);
      if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('Invalid numeric input');

      switch (fnName) {
        case 'add':
          result = add(a, b);
          break;
        case 'subtract':
          result = subtract(a, b);
          break;
        case 'multiply':
          result = multiply(a, b);
          break;
        case 'divide':
          result = divide(a, b);
          break;
        case 'modulo':
          result = modulo(a, b);
          break;
        case 'power':
          result = power(a, b);
          break;
        default:
          throw new Error('Unsupported operation');
      }
    }

    // Print result
    if (Number.isFinite(result)) {
      console.log(result);
    } else {
      console.log(String(result));
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(3);
  }
}
