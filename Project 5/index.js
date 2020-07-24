function addCount() {
	document.getElementById('number').textContent++
	afterUpdate()
}

function lowerCount() {
	document.getElementById('number').textContent--
	afterUpdate()
}

function afterUpdate() {
	number = document.getElementById('number').textContent
	if (number > 0) {
		document.getElementById('number').style.color = 'green'
	} else if (number < 0) {
		document.getElementById('number').style.color = 'red'
	} else {
		document.getElementById('number').style.color = 'white'
	}
}