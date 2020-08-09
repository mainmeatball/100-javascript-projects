const constHex = '0123456789ABCDEF';

function changeColor() {
	let hexColor = '#'
	for (let i = 0; i < 6; i++) {
		hexColor += constHex[Math.floor(Math.random() * constHex.length)]
	}
	document.body.style.background = hexColor
	document.getElementById('hex').textContent = hexColor
}
