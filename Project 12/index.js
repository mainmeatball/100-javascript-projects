class TodoElement {
	constructor(template) {
		this.node = template;
		this.nameInput = template.querySelector('.todo-el-name');
		this.checkButton = template.querySelector('.check');
		this.editButton = template.querySelector('.edit');
		this.removeButton = template.querySelector('.remove');
		this.domElement = template.querySelector('.todo-el');

		this.nameInput.addEventListener("focusout", () => {
			this.nameInput.readOnly = true;
		});

		this.checkButton.addEventListener('click', () => this.nameInput.classList.toggle('checked'));
		
		this.editButton.addEventListener('click', () => {
			this.nameInput.readOnly = false;
			this.nameInput.focus();
		});

		this.removeButton.addEventListener('click', () => {
			this.domElement.remove();
		});
	}

	updateName(name) {
		this.nameInput.value = name;
	}
}

class Page {
	constructor(input, template, todoList) {
		this.input = input;
		this.template = template;
		this.todoList = todoList;
	}

	clearInput() {
		this.input.value = '';
	}

	addTodoElement(todoElement) {
		this.todoList.appendChild(todoElement.domElement);
	}

	isDuplicate(name) {
		return Array.from(this.todoList.querySelectorAll('.todo-el')).map(el => el.value).includes(name);
	}

	removeTodoElement(name) {
		this.todoElementMap[name].remove();
	}

	clearTodoList() {
		Array.from(this.todoList.querySelectorAll('.todo-el')).forEach(el => el.remove());
	}
}

const page = new Page(document.getElementById('input'),
				 	  document.getElementById('todo-el-template'),
					  document.getElementById('todo-list'));

function addItem(event) {
	event.preventDefault();
	if (page.isDuplicate(input.value)) {
		return;
	}
	const todoElement = new TodoElement(page.template.content.cloneNode(true));
	todoElement.updateName(input.value);
	page.addTodoElement(todoElement);
	page.clearInput();
}

function clearItems() {
	page.clearTodoList();
}
