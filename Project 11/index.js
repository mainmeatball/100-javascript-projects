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

	getValue() {
		return +this.input.value;
	}
}

class TipResult {
	constructor(tip, total, perPerson) {
		this.tip = tip;
		this.total = total;
		this.perPerson = perPerson;
	}
}

const billAmount = new InputEntity($('#bill-amount')[0], $('#amount-validation'));
const personNumber = new InputEntity($('#person-number')[0], $('#person-validation'));
const tipPercent = new InputEntity($('#tip-percent')[0], $('#tip-validation'));

const inputs = [billAmount, personNumber, tipPercent];

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

function process() {
	assignVisibility();
	if (!validateInputs()) {
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

	const bill = billAmount.getValue();
	const people = personNumber.getValue();
	const tip = tipPercent.getValue();
	
	const tipResult = calculateTips(bill, people, tip);
	
	tipAmount.textContent = tipResult.tip;
	totalAmount.textContent = tipResult.total;
	tipPerPerson.textContent = tipResult.perPerson;
}

function validateInputs() {
	return inputs.every(el => el.isValid());
}

function assignVisibility() {
	inputs.forEach(el => el.assignVisibility());
}

function calculateTips(bill, people, tip) {
	const localTip = bill * tip;
	const total =  bill + localTip;
	const perPerson = total / people;
	return new TipResult(localTip, total, perPerson);
}	
