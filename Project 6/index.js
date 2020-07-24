const images = ["resources/img1.jpg", "resources/img2.jpg", "resources/img3.jpg"]
let index = 0

function switchLeft() {
	index = index == 0 ? images.length - 1 : index - 1
	setImage(images[index])
}

function switchRight() {
	index = index == images.length - 1 ? 0 : index + 1
	setImage(images[index])
}

function setImage(img) {
	document.getElementById("image").src = img
}
