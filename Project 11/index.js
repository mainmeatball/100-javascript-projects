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

const checkValidity = {
	'billAmount': () => billAmount.checkValidity(),
	'personNumber': () => personNumber.checkValidity(),
	'tipPercent': () => tipPercent.checkValidity()
}

const tips = {
	1: 0.2,
	2: 0.1,
	3: 0.02
}

function validateInputs() {
	let validAmount = validate('billAmount', amountValidation);
	let validPeople = validate('personNumber', personValidation);
	let validTip = validate('tipPercent', tipValidation);
	return validAmount && validPeople && validTip;
}

function validate(input, validField) {
	if (checkValidity[input]()) {
		validField.hide();
		return true;
	} else {
		validField.show();
		result.hide();
		return false;
	}
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

	const bill = +billAmount.value;
	const people = +personNumber.value;
	const tip = +tipPercent.value;
	
	const tipValue = bill * tips[tip];
	const total = bill + tipValue;
	const perPerson = total / people;

	tipAmount.textContent = tipValue;
	totalAmount.textContent = total;
	tipPerPerson.textContent = perPerson;
}
