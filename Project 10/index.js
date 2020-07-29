const input = document.getElementById('input');
let result;
let operation = '';
let deleteIfEnter = false;
let clearMemory = false;

const operations = {
	'' : (value) => sumResult(value),
	'+': (value) => sumResult(value),
	'-': (value) => sumResult(-value),
	'*': (value) => multiplyResult(value),
	'/': (value) => divideResult(value),
	'=': (value) => showResult(value)
}

function onload() {
	document.addEventListener("keydown", keyDownInput, false);
}

function keyDownInput(e) {
  let keyCode = e.keyCode;
  let shift = e.shiftKey;
  if (shift == false && keyCode >= 48 && keyCode <= 57) {
    addNumberUI(keyCode - 48);
    return;
  }
  if (keyCode == 191) {
  	operate('/');
  	return;
  }
  if (shift == true && keyCode == 58) {
  	operate('*');
  	return;
  }
  if (keyCode == 189) {
  	operate('-');
  	return;
  }
  if (shift == true && keyCode == 187) {
  	operate('+');
  	return;
  }
  if (keyCode == 187 || keyCode == 13) {
  	operate('=');
  	return;
  }
  if (keyCode == 8) {
  	backspace();
  	return;
  }
  if (keyCode == 67) {
  	clearInput();
  	return;
  }
}

function clearInput() {
	input.value = '';
	if (!clearMemory) {
		clearMemory = true;
	} else {
		clrMemory();
	}
}

function clrMemory() {
	result = 0;
	operation = '';
}

function backspace() {
	input.value = input.value.slice(0, -1);
	operation = '';
}

function operate(op) {
	clearMemory = false;
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
