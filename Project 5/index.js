function addCount() {
	document.getElementById('number').textContent++
	afterUpdate()
}

function lowerCount() {
	document.getElementById('number').textContent--
	afterUpdate()
}

function afterUpdate() {
	number = document.getElementById('number')
	if (number.textContent > 0) {
		number.style.color = 'green'
	} else if (number.textContent < 0) {
		number.style.color = 'red'
	} else {
		number.style.color = 'white'
	}
}