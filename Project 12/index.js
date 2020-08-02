class Page {
	constructor(input, template, todoList) {
		this.input = input;
		this.template = template;
		this.todoList = todoList;
	}
}

const page = new Page(document.getElementById('input'),
				 	  document.getElementById('todo-el-template'),
					  document.getElementById('todo-list'));

function addItem() {
	if (duplicate(input.value)) {
		return;
	}
	const clone = page.template.content.cloneNode(true);
	const itemName = clone.querySelector('#todo-el-name');
	itemName.textContent = input.value;
	page.todoList.appendChild(clone);
}

function checkItem(event) {
	const elementNameParagraph = event.target.parentNode.parentNode.parentNode.querySelector('#todo-el-name');
	check(elementNameParagraph);
}

function editItem(event) {
	const elementNameParagraph = event.target.parentNode.parentNode.parentNode.querySelector('#todo-el-name');
	elementNameParagraph.setAttribute('contentEditable', 'true');
	const contentLength = elementNameParagraph.textContent.legnth;
	elementNameParagraph.focus();
	setCaretToEnd(elementNameParagraph);
}

function removeItem(event) {
	event.target.parentNode.parentNode.parentNode.remove();
}

function clearItems() {
	Array.from(page.todoList.querySelectorAll('div')).forEach(el => el.remove());
}

function check(el) {
	el.classList.contains('checked') ? el.classList.remove('checked') : el.classList.add('checked');
}

function setCaretToEnd(el) {
	const range = document.createRange();
	range.selectNodeContents(el);
	range.collapse(false);
	const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

function duplicate(name) {
	return Array.from(page.todoList.querySelectorAll('p')).map(el => el.textContent).includes(name);
}
