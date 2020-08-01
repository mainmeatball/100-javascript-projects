const wrapper = $('#wrapper')[0];

const calculateButton = $('#calculate-button')[0];

const billAmount = $('#bill-amount')[0];
const personNumber = $('#person-number')[0];
const tipPercent = $('#tip-percent')[0];

const amountValidation = $('#amount-validation');
const personValidation = $('#person-validation');
const tipValidation = $('#tip-validation');

const tipAmount = $('#tip-amount')[0];
const totalAmount = $('#total-amount')[0];
const tipPerPerson = $('#tip-per-person')[0];

const result = $('#result');
const animation = $('#animation');
const info = $('#info');

$('.validation').hide();
result.hide();
animation.hide();
info.hide();

let amountErrorHeight = 0;
let personErrorHeight = 0;
let tipErrorHeight = 0;

const inputPredicate = {
	'billAmount': () => !billAmount.value.length || billAmount.value <= 0,
	'personNumber': () => !personNumber.value.length || personNumber.value <= 0,
	'tipPercent': () => !tipPercent.selectedIndex
}

const heightField = {
	'billAmount': (value) => amountErrorHeight = value,
	'personNumber': (value) => personErrorHeight = value,
	'tipPercent': (value) => tipErrorHeight = value
}

const tips = {
	1: 0.2,
	2: 0.1,
	3: 0.02
}

function validateInputs() {
	validate('billAmount', amountValidation);
	validate('personNumber', personValidation);
	validate('tipPercent', tipValidation);
	const sumHeight = amountErrorHeight + personErrorHeight + tipErrorHeight;
	expandFrame(sumHeight);
	return !sumHeight;
}

function validate(input, validField) {
	if (inputPredicate[input]()) {
		validField.show();
		result.hide();
		heightField[input](50);
	} else {
		validField.hide();
		heightField[input](0);
	}
}

function expandFrame(sum) {
	wrapper.style.height = 'calc(66% + ' + sum + 'px)';
}

function calculateTip() {
	const allValid = validateInputs();
	if (!allValid) {
		return;
	}
	result.show();
	animation.show();

	setTimeout(() =>  {
       animation.hide(); 
       info.show();
	}, 2000);

	expandFrame(200);

	const bill = +billAmount.value;
	const people = +personNumber.value;
	const tip = tipPercent.selectedIndex;
	
	const tipValue = bill * tips[tip];
	const total = bill + tipValue;
	const perPerson = total / people;

	tipAmount.textContent = tipValue;
	totalAmount.textContent = total;
	tipPerPerson.textContent = perPerson;
}
