'use strict';

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=num]'); //elemento que pelo menos parte é igual a num *=
const operators = document.querySelectorAll('[id*=operator]');
let newNumber = true;
let operator;
let previousNumber;

const pendingOperation = () => operator !== undefined;

const calcule = () => {
	if (pendingOperation()) {
		const currentNumber = Number(display.textContent.replace(',', '.'));
		newNumber = true;

		const result = eval (`${previousNumber}${operator}${currentNumber}`);
		updateDisplay(result);
	}
};

const updateDisplay = (text) => {
	if (newNumber) {
		display.textContent = text.toLocaleString('BR'); //alternativa ao replace
		newNumber = false;
	}
	else {
		display.textContent += text;
	}

};
const insertNum = (event) => updateDisplay(event.target.textContent);
numbers.forEach(number => number.addEventListener('click', insertNum)); //cria um evento para cada numero sem ter que adicionar um por um 
const selectOperator = (event) => {
	if (!newNumber) {
		calcule();
		newNumber = true;
		operator = event.target.textContent;
		previousNumber = Number(display.textContent.replace(',', '.'));
	}
}
operators.forEach(operator => operator.addEventListener('click', selectOperator));

const equalAct = () => {
	calcule();
	operator = undefined;

}
const clearDisplay = () => display.textContent = '';
const clearCalculation = () => {
	clearDisplay();
	operator = undefined;
	newNumber = true;
	previousNumber = undefined;
};
const deletePreviousNumber = () => {
	display.textContent = display.textContent.slice(0, -1);
};
const reverse = () => {
	newNumber = true;
	updateDisplay(display.textContent * -1);
};
const decimalExists =  () => display.textContent.indexOf(',') !== -1;
const valueExists = () => display.textContent.length > 0;

const insertDecimal = () => {
	if (!decimalExists()){
		if (valueExists()){
			updateDisplay(',');
		}else {
			updateDisplay('0,');
		}
	}
};

document.getElementById('equal').addEventListener('click', equalAct);
document.getElementById('clearDisplay').addEventListener('click', clearDisplay);
document.getElementById('clearCalculation').addEventListener('click', clearCalculation);
document.getElementById('backspace').addEventListener('click', deletePreviousNumber);
document.getElementById('reverse').addEventListener('click', reverse);
document.getElementById('decimal').addEventListener('click', insertDecimal);

const keyboardMap = {
	'0' : 'num0',
	'1' : 'num1',
	'2' : 'num2',
	'3' : 'num3',
	'4' : 'num4',
	'5' : 'num5',
	'6' : 'num6',
	'7' : 'num7',
	'8' : 'num8',
	'9' : 'num9',
	'/' : 'operatorDivide',
	'*' : 'operatorMultiply',
	'-' : 'operatorSubtract',
	'+' : 'operatorAdd',
	'=' : 'equal',
	'c' : 'clearDisplay',
	',' : 'decimal',
	'.' : 'decimal',
	'Enter' : 'equal',
	'Escape' : 'clearCalculation',
	'Backspace' : 'backspace',
};

const mapKeyboard = (event) => {
	const key = event.key;
	const allowedKey = () => Object.keys(keyboardMap).indexOf(key) !== -1;
	if(allowedKey()) document.getElementById(keyboardMap[key]).click();
}
document.addEventListener('keydown', mapKeyboard);