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
  return x ** n;
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
};

// uses calc object and operator character to do the calculation
const operate = function(operator, a, b) {
    return calc[operator](a, b);
};

function addClass(key, className) {
    key.classList.add(className);
};

function removeClass(key, className) {
    key.classList.remove(className);
};

function runCalc(inputVal) {
    // if charater is a number then append display
    console.log('Text content: ' + display.textContent);
    console.log('Number(text): ' + Number(inputVal));
    if (Number(inputVal)) {
        
        if ((display.textContent) === "" && (Number(inputVal) === 0)) {
            console.log("Do nothing");
        }
        else {
            display.textContent += inputVal.toString();
        }
    } else {
        display.textContent = inputVal.toString();
    }
    // if character is an operator then refresh display
}

const display = document.querySelector("#display");
display.textContent = "";
const container = document.querySelector('#container');
const keypad = document.querySelectorAll('.keypad');
console.log(keypad);

keypad.forEach(key => key.addEventListener('click', () => {
    runCalc(key.textContent);
}));

keypad.forEach(key => key.addEventListener('mouseover', () => addClass(key,'hover')));
keypad.forEach(key => key.addEventListener('mouseout', () => removeClass(key,'hover')));