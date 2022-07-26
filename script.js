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

function clickEvent(key) {
    runCalc(key.textContent);
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

function runCalc(inputVal) {
    // if charater is a number then append display
    console.log('Text content: ' + display.textContent);
    console.log('Number(text): ' + inputVal);
    let inputType = getInputType(inputVal);

    if (inputType === 'operator') {
        display.textContent = inputVal;
    } else if (inputType === 'number') {
        if (display.textContent.toString() === '0') {
            display.textContent = "0";
        } else if (hasOperator(display.textContent)) {
            display.textContent = inputVal;
        } else {
            display.textContent += inputVal;
        }    
    } else if (inputType === 'decimal') {
        // only allow one decimal point
        if (!display.textContent.includes('.')) {
            display.textContent += '.';
        }
    } else if (inputType === 'special') {
        if (inputVal == 'C') {
            // clear everything
            display.textContent = '';
            // clear where the current expression is being stored
        }
    } else if (inputType === 'compute') {
        console.log(inputType);
    }

}

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

