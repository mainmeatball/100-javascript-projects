const calculateButton = $('#calculate-button')[0];

class InputEntity {
	constructor(input, validation) {
		this.input = input;
		this.validation = validation;
	}

	isValid() {
		return this.input.checkValidity();
	}

	hideValidationMsg() {
		this.validation.hide();
	}

	showValidationMsg() {
		this.validation.show();
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

const tips = {
	1: 0.2,
	2: 0.1,
	3: 0.02
}

function validateInputs() {
	return [billAmount, personNumber, tipPercent].every(el => el.isValid());
}

function assignVisibility() {
	[billAmount, personNumber, tipPercent].forEach(el => {
		el.isValid() 
			? el.hideValidationMsg()
			: (
				el.showValidationMsg(),
				result.hide()
			)
		})
}

function calculateTip() {
	if (!validateInputs()) {
		return;
	}
	assignVisibility();

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
	
	const tipValue = bill * tips[tip];
	const total = bill + tipValue;
	const perPerson = total / people;

	tipAmount.textContent = tipValue;
	totalAmount.textContent = total;
	tipPerPerson.textContent = perPerson;
}
