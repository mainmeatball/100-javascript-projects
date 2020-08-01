const input = document.getElementById('input');
let result;
let operation = '';
let deleteIfEnter = false;
let shouldClearMemory = false;

const terminalOperations = ['','+','-','*','/','=','Enter'];
const intermediateOperations = ['Backspace', 'c'];

const operations = {
	'' : (value) => sumResult(value),
	'+': (value) => sumResult(value),
	'-': (value) => sumResult(-value),
	'*': (value) => multiplyResult(value),
	'/': (value) => divideResult(value),
	'=': (value) => showResult(value),
	'Enter': (value) => showResult(value),
	'Backspace': () => backspace(),
	'c': () => clearInput()
}

function onload() {
	document.addEventListener("keydown", keyDownInput);
}

function keyDownInput(e) {
	let key = e.key;
	if (key >= '0' && key <= '9') {
		addNumberUI(key);
		return;
	}
	if (isTerminalOperation(key)) {
		operate(key);
		return;
    }
    if (isIntermediateOperation(key)) {
        operations[key](input.value);
    }
}

function clearInput() {
	input.value = '';
	shouldClearMemory ? clearMemory() : shouldClearMemory = true;
}

function clearMemory() {
	result = 0;
	operation = '';
}

function backspace() {
	input.value = input.value.slice(0, -1);
	operation = '';
}

function operate(op) {
	shouldClearMemory = false;
	operations[operation](input.value);
	operation = op;
	deleteIfEnter = true;
}

function addNumberUI(number) {
	if (deleteIfEnter) {
		clearInput();
		deleteIfEnter = false;
	}
	input.value += number;
}

function addDot() {
	input.value += '.';
}

function sumResult(value) {
	if (!result) {
		result = value;
		return;
	}
	result = +result + +value;
	updateInput(result);
}

function multiplyResult(value) {
	if (!result) {
		result = value;
		return;
	}
	result *= value;
	updateInput(result);
}

function divideResult(value) {
	if (!result) {
		result = value;
		return;
	}
	result /= value;
	updateInput(result);
}

function showResult(value) {
	updateInput(value);
}

function updateInput(value) {
	input.value = value;
}

function isTerminalOperation(key) {
	return terminalOperations.includes(key);
}

function isIntermediateOperation(key) {
	return intermediateOperations.includes(key);
}
