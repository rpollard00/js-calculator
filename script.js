// Math operation functions
const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
  return a - b;
};

const multiply = function(a, b) {
  return a * b;
};

const divide = function(a, b) {
    return a / b;
}

const modulo = function(a, b) {
    return a % b;
}

const power = function(x, n) {
  let raised = x;
	for (i=1; i < n; i++) {
    raised *= x;
  }
  return raised;
};

const factorial = function(val) {
  let result = val;

  if (val === 0) return 1;

	for (i = val - 1; i > 0; i--) {
    result *= i;
  }
  return result;
};

const calc = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
    "%": modulo,
    "^": power,
    "!": factorial
}