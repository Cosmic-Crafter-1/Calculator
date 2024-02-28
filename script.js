// Variables to store calculator operation parts
let firstNumber = '';
let operator = '';
let secondNumber = '';
let displayValue = '';
let decimalAdded = false;

// Display element
const display = document.querySelector('.display');

// Number buttons
const numberButtons = document.querySelectorAll('.button-wrapper button:not(.special-btn)');

// Operator buttons
const operatorButtons = document.querySelectorAll('.special-btn:not(.dot-btn):not(.equal-btn):not(.clear-btn):not(.backspace-btn)');

// Clear button
const clearButton = document.querySelector('.clear-btn');

// Backspace button
const backspaceButton = document.querySelector('.backspace-btn');

// Dot button
const dotButton = document.querySelector('.dot-btn');

// Equal button
const equalButton = document.querySelector('.equal-btn');

// Function to update display
const updateDisplay = () => {
  display.textContent = displayValue;
};

// Function to clear calculator
const clearCalculator = () => {
  firstNumber = '';
  operator = '';
  secondNumber = '';
  displayValue = '';
  decimalAdded = false;
  updateDisplay();
};

/// Function to handle number button clicks
const handleNumberButtonClick = (num) => {
	if (operator === '') {
	  firstNumber = parseFloat(firstNumber + num).toString(); // Parse as float before concatenating
	  displayValue += num;
	} else {
	  secondNumber = parseFloat(secondNumber + num).toString(); // Parse as float before concatenating
	  displayValue += num;
	}
	updateDisplay();
  };
  

// Function to handle operator button clicks
const handleOperatorButtonClick = (op) => {
  operator = op;
  displayValue += ` ${op} `;
  updateDisplay();
};

// Function to handle dot button click
const handleDotButtonClick = () => {
  if (!decimalAdded) {
    displayValue += '.';
    decimalAdded = true;
    updateDisplay();
  }
};

// Function to handle backspace button click
const handleBackspaceButtonClick = () => {
  if (operator === '') {
    firstNumber = firstNumber.slice(0, -1);
  } else if (secondNumber === '') {
    operator = '';
  } else {
    secondNumber = secondNumber.slice(0, -1);
  }
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
};

// Function to perform basic math operations
const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => parseFloat(a) - parseFloat(b);
const multiply = (a, b) => parseFloat(a) * parseFloat(b);
const divide = (a, b) => {
  if (parseFloat(b) === 0) {
    return "Error: Can't divide by zero!";
  } else {
    return parseFloat(a) / parseFloat(b);
  }
};

// Function to operate based on operator
const operate = (operator, a, b) => {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'x':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return "Error: Invalid operator!";
  }
};

// Function to handle equal button click
const handleEqualButtonClick = () => {
  if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
    let result = operate(operator, firstNumber, secondNumber);
    // Round result to avoid long decimals
    result = Math.round((result + Number.EPSILON) * 100) / 100;
    displayValue = result.toString();
    firstNumber = result.toString();
    operator = '';
    secondNumber = '';
    updateDisplay();
  }
};

// Add event listeners to number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleNumberButtonClick(button.textContent);
  });
});

// Add event listeners to operator buttons
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleOperatorButtonClick(button.textContent);
  });
});

// Add event listener to clear button
clearButton.addEventListener('click', clearCalculator);

// Add event listener to dot button
dotButton.addEventListener('click', handleDotButtonClick);

// Add event listener to backspace button
backspaceButton.addEventListener('click', handleBackspaceButtonClick);

// Add event listener to equal button
equalButton.addEventListener('click', handleEqualButtonClick);
