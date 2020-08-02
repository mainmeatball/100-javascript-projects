const calculateButton = $('#calculate-button')[0];

class InputEntity {
	constructor(input, validation) {
		this.input = input;
		this.validation = validation;
	}

	isValid() {
		return this.input.checkValidity();
	}

	assignVisibility() {
		this.isValid() ? this.validation.hide() : this.validation.show();
	}
}

const billAmount = new InputEntity($('#bill-amount')[0], $('#amount-validation'));
const personNumber = new InputEntity($('#person-number')[0], $('#person-validation'));
const tipPercent = new InputEntity($('#tip-percent')[0], $('#tip-validation'));

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

const UPLOAD_ANIMATION_DURATION = 3000;

function calculateTip() {
	if (!validateInputs()) {
		assignVisibility();
		result.hide();
		return;
	}

	result.show();
	info.hide();
	animation.show();

	setTimeout(() =>  {
       animation.hide(); 
       info.show();
	}, UPLOAD_ANIMATION_DURATION);

	const bill = +billAmount.input.value;
	const people = +personNumber.input.value;
	const tip = +tipPercent.input.value;
	
	const tipValue = bill * tip;
	const total = bill + tipValue;
	const perPerson = total / people;

	tipAmount.textContent = tipValue;
	totalAmount.textContent = total;
	tipPerPerson.textContent = perPerson;
}

function validateInputs() {
	return [billAmount, personNumber, tipPercent].every(el => el.isValid());
}

function assignVisibility() {
	[billAmount, personNumber, tipPercent].forEach(el => el.assignVisibility());
}
