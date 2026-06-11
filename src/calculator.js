#!/usr/bin/env node
/*
 Node.js CLI Calculator
 Supported operations:
 - Addition
 - Subtraction
 - Multiplication
 - Division

 Usage:
   node src/calculator.js add 2 3
   node src/calculator.js subtract 5 2
   node src/calculator.js multiply 4 6
   node src/calculator.js divide 9 3

 Also supports infix form:
   node src/calculator.js 2 + 3
   node src/calculator.js 9 / 3
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

module.exports = { add, subtract, multiply, divide };

// CLI entrypoint
if (require.main === module) {
  const argv = process.argv.slice(2);

  if (argv.length === 0) {
    console.error('Usage: node src/calculator.js <op> <a> <b>\nOr: node src/calculator.js <a> <symbol> <b>');
    process.exit(1);
  }

  let op, aStr, bStr;

  if (argv.length === 3) {
    // Could be: add 2 3  OR  2 + 3
    if (['add','subtract','multiply','divide','+','-','*','/'].includes(argv[1]) && isNaN(Number(argv[0]))) {
      // form: op a b
      op = argv[0];
      aStr = argv[1];
      bStr = argv[2];
    }
  }

  if (!op) {
    if (argv.length === 3) {
      // assume form: a op b
      aStr = argv[0];
      op = argv[1];
      bStr = argv[2];
    } else if (argv.length === 3) {
      // fallback
      [op, aStr, bStr] = argv;
    } else if (argv.length === 3) {
      [op, aStr, bStr] = argv;
    } else if (argv.length === 2) {
      console.error('Insufficient arguments. Provide operation and two numbers.');
      process.exit(1);
    } else {
      // handle op name + two numbers: e.g., add 2 3
      if (argv.length === 3) {
        [op, aStr, bStr] = argv;
      } else {
        // join as best-effort
        [op, aStr, bStr] = argv;
      }
    }
  }

  // Normalize: allow op names or symbols
  const opMap = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    'x': 'multiply',
    'X': 'multiply',
    '/': 'divide',
    'add': 'add',
    'subtract': 'subtract',
    'multiply': 'multiply',
    'divide': 'divide'
  };

  const opKey = (op || '').toString();
  const fnName = opMap[opKey];

  const a = Number(aStr);
  const b = Number(bStr);

  if (!fnName || Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Invalid input. Example: node src/calculator.js add 2 3  OR  node src/calculator.js 2 + 3');
    process.exit(2);
  }

  try {
    let result;
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
      default:
        throw new Error('Unsupported operation');
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
