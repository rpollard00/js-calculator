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
function operate(operator, a, b) {
    const aNum = +a;
    const bNum = +b;
    return calc[operator](aNum, bNum);
};

function addClass(key, className) {
    key.classList.add(className);
};

function removeClass(key, className) {
    key.classList.remove(className);
};

function clickEvent(key) {
    runCalc(key.textContent);
}


// check to make sure format is expression
function isMathematicalExpression(currentExpression) {
    expReg = /[0-9.]+\s[+\-*/%]\s+[0-9.]+/;
    if (currentExpression.toString().match(expReg)) {
        return true;
    }

    return false;
}

function calculateExpression(currentExpression) {
    [a, operator, b] = currentExpression.split(' ');
    
    return operate(operator, a, b);
}

// isNan is confusing so invert its
function isNumber(val) {
    return !isNaN(val);
}

// returns the type of input e.g number, decimal, operator, special
function getInputType(inputVal) {
    if (Number(inputVal) || inputVal === "0") {
        return 'number';
    } else if (inputVal === ".") {
        return 'decimal';
    } else if (inputVal in calc) {
        //inputVal === '+' || inputVal === '-' || inputVal === '*' || inputVal === '/') {
        return 'operator';
    } else if (inputVal === 'CE' || inputVal === 'C') {
        return 'special';
    }

    return 'compute';
}

function hasOperator(text) {
    const operators = Object.keys(calc);
    const textArray = text.split('');
    const found = textArray.some(val => operators.includes(val));
    if (found) {
        return true;
    }

    return false;
}

function disableKey(key_id) {
    keypad.forEach(key => {
        if (key.id === key_id) {
            key.removeEventListener('click', () => clickEvent(key));
          //  key.removeEventListener('mouseover');
          //  key.removeEventListener('mouseout');
           // key.classList.includes('hover') ? key.removeClass('hover') : null;
        }
        else {
            return false;
        }
    });

    return true;
}

function updateDisplayText(text) {
    // first see if its a number
    if (text.toString().length >= MAX_DISPLAY_LEN) {
        if (isNumber(text)) {
            // is a decimal
            if (!Number.isInteger(text)) {
                const splitText = text.split('.');
                const decimalText = splitText[splitText.length - 1]; // get the decimal portion only
                text = text.toFixed(decimalText); // when we max out the display length, on decimal numbers, fix the decimal position
            }
        }
    }

    display.textContent = text;
}

function runCalc(inputVal) {
    // if charater is a number then append display
    let inputType = getInputType(inputVal);


    // don't let an operator be the first inputVal
    // if the last input was an operator, don't allow an operator
    if (inputType === 'operator' &&
                display.textContent !== "" &&
                getInputType(currentExpression[currentExpression.length - 1]) !== "operator") { // last element is not an operator
        
        // if there's a complte expression, calculate it
        if (isMathematicalExpression(currentExpression)) {
            currentExpression = calculateExpression(currentExpression);
            display.textContent = currentExpression;
            currentExpression += " " + inputVal + " ";
            prevCalc = true;
        } else {
            display.textContent = inputVal;
            currentExpression += " " + inputVal;
        }
        // compute if there is already an operator in the expression
    } else if (inputType === 'number') {
        // don't exceed display window
        if (display.textContent.toString().length >= MAX_DISPLAY_LEN) {
            return false; 
        }
        if (display.textContent.toString() === '0' && inputVal.toString() === "0") { // don't allow multiple zeros
            currentExpression = inputVal;
            display.textContent = currentExpression;
        } else if (display.textContent.toString() === '0') {
                currentExpression = inputVal;
                display.textContent = currentExpression;
        } else if (hasOperator(display.textContent)) {
            display.textContent = inputVal;
            // if currentExpression already has an operator, it must be
            // before the current number so add a space
            currentExpression += " " + inputVal;
        } else if (prevCalc) { // need a flag to override default display logic if we just calculated
            display.textContent = inputVal;
            currentExpression += inputVal;
            prevCalc = false;
        } else {
            display.textContent += inputVal;
            currentExpression += inputVal;
        }    
    } else if (inputType === 'decimal') {
        // only allow one decimal point
        if (!display.textContent.includes('.')) {
            display.textContent += '.';
            currentExpression += inputVal;
        }
    } else if (inputType === 'special') {
        if (inputVal == 'C') {
            // clear everything
            display.textContent = '';
            currentExpression = '';
            // clear where the current expression is being stored
        } else if (inputVal == 'CE') { // not fully implemented
            display.textContent = '';
            currentExpression = '';
        }
    } else if (inputType === 'compute' && isMathematicalExpression(currentExpression)) {
        // if there are 2 numeric values and an operator
        console.log(inputType);
        currentExpression = calculateExpression(currentExpression);
        display.textContent = currentExpression;
    }

    console.log(`Current Expression ${currentExpression}`);
}

const MAX_DISPLAY_LEN = 21;
let prevCalc = false; // flag for display logic
const display = document.querySelector("#display");
display.textContent = "";
let expression = "";
const container = document.querySelector('#container');
const keypad = document.querySelectorAll('.keypad');

let currentExpression = "";
console.log(keypad);

keypad.forEach(key => key.addEventListener('click', () => clickEvent(key)));

keypad.forEach(key => key.addEventListener('mouseover', () => addClass(key,'hover')));
keypad.forEach(key => key.addEventListener('mouseout', () => removeClass(key,'hover')));

