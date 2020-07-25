class Reviewer {
	constructor(avatar, name, text) {
		this.avatar = avatar;
		this.name = name;
		this.text = text;
	}
}

const reviewers = [
new Reviewer('resources/avatar1.png', 'John', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis neque reprehenderit laborum, corporis explicabo assumenda. Porro impedit consectetur animi, reprehenderit recusandae sapiente at aliquam reiciendis modi ipsam rerum suscipit distinctio?'),
new Reviewer('resources/avatar2.png', 'Steve', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock'),
new Reviewer('resources/avatar3.jpeg', 'Craig','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.')
]
let index = 0

function initReviewer() {
	setReviewer(reviewers[0])
}

function switchLeft() {
	index = index == 0 ? reviewers.length - 1 : index - 1
	setReviewer(reviewers[index])
}

function switchRight() {
	index = index == reviewers.length - 1 ? 0 : index + 1
	setReviewer(reviewers[index])
}

function setReviewer(reviewer) {
	document.getElementById("avatar").src = reviewer.avatar
	document.getElementById("name").textContent = reviewer.name
	document.getElementById("testimonial").textContent = reviewer.text
}
