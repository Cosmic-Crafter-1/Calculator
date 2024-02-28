/* Problems to be addressed: 
	1. When I click an operator and then click another operator, it should update the current operator, which it doesn't.
*/

class Calculator {

	constructor(previousOperandTextELement, currentOperandTextElement) {
		this.previousOperandTextELement = previousOperandTextELement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}

	delete() {
		// Slice Index 0 to last but 1.
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {

		if (number === '.' && this.currentOperand.includes('.')) return;

		// We convert it to string so that Js doesn't end up adding the numbers
		// but rather append in end. Like 1+1 == 11, instead of 2.
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {

		// This is because if I clicked an op btn twice, it clears out the screen
		// which we don't want, so adding in a check-in.
		if (this.currentOperand === '') return

		// Let's say I type 55 + 55 and click = btn, it gives 110.
		// But I click 55 + 55 and then click ÷ btn, it should still compute and 
		// display the ÷ symbol, so get in a check in.
		if (this.previousOperand !== '') {
			this.compute();
		}

		// // Let's say I clicked 100 +, but decided to change it to -, I'm unable to.
		// // So this should update the clicked operation as current operation.

		this.operation = operation;

		// When we click an operation, it should go to the first or the previous screen and clear out  current screen to type the number.
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute() {

		let result;

		// Convert string to number.
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);

		// If user doesn't enter anything and clicks equals btn, then do nothing.
		if (isNaN(prev) || isNaN(current)) return

		switch (this.operation) {
			case '+':
				result = prev + current;
				break;
			case '-':
				result = prev - current;
				break;
			case '×':
				result = prev * current;
				break;
			case '%':
				result = prev % current;
				break;
			case '÷':
				if (isNaN(prev) && current === 0) {
					return "Infinity :)";
				} else {
					result = prev / current;
				}
				break;
			default:
				return;
		}

		this.currentOperand = result.toString();

		// Refreshing current operations to add new numbers.
		this.operation = undefined;
		this.previousOperand = '';
	}

	// To add in commas to large numbers:
	// Both to prev and curr numbers.
	getDisplayNumber(number) {
		// We need to split the number into before and after decimal '.'
		// Since it wasn't recognizing '.'
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = (stringNumber.split('.')[1]);

		let integerDisplay;

		// Check if it's a number.
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			// Convert to a human language, in this case english.
			integerDisplay = integerDigits.toLocaleString('en',
				// To make sure we don't have any decimal places after it get's converted to a number.
				{ maximumFractionDigits: 0 });
		}

		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		// This is to display the current number
		this.currentOperandTextElement.innerText =
			this.getDisplayNumber(this.currentOperand);

		// To show up operands since they weren't showing
		// If the operation exists:
		if (this.operation != null) {
			// The display is concatenation of the previous number and
			// the current operation together.
			this.previousOperandTextELement.innerText =
				`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
		}
		// Had missed the else keyword, and wasn't updating the operation on screen.
		else {
			// If there's no operation, just display the previous operand without an operation symbol.
			this.previousOperandTextELement.innerText = '';
		}
	}

}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextELement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextELement, currentOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	})
})

equalsButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
	calculator.delete();
	calculator.updateDisplay();
})
