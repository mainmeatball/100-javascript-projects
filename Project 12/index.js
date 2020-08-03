const todoElements = new Set();

class TodoElement {
	constructor(template) {
		this.nameInput = template.querySelector('.todo-el-name');
		this.checkButton = template.querySelector('.check');
		this.editButton = template.querySelector('.edit');
		this.removeButton = template.querySelector('.remove');
		this.domElement = template.querySelector('.todo-el');

		this.boundInputListenerCallback = this.disableInput.bind(this);
		this.boundCheckButtonListenerCallback = this.check.bind(this);
		this.boundEditButtonListenerCallback = this.edit.bind(this);
		this.boundRemoveButtonListenerCallback = this.remove.bind(this);

		this.nameInput.addEventListener('focusout', this.boundInputListenerCallback);
		this.checkButton.addEventListener('click', this.boundCheckButtonListenerCallback);
		this.editButton.addEventListener('click', this.boundEditButtonListenerCallback);
		this.removeButton.addEventListener('click', this.boundRemoveButtonListenerCallback);
	}

	disableInput() {
		this.nameInput.readOnly = true;
	}

	check() {
		this.nameInput.classList.toggle('checked');
	}

	edit() {
		this.nameInput.readOnly = false;
		this.nameInput.focus();
	}

	remove() {
		todoElements.delete(this);
		this.nameInput.removeEventListener('focusout', this.boundInputListenerCallback);
		this.checkButton.removeEventListener('click', this.boundCheckButtonListenerCallback);
		this.editButton.removeEventListener('click', this.boundEditButtonListenerCallback);
		this.removeButton.removeEventListener('click', this.boundRemoveButtonListenerCallback);
		this.domElement.remove();
	}

	updateName(name) {
		this.nameInput.value = name;
	}

	getName() {
		return this.nameInput.value;
	}
}

class Page {
	constructor(input, template, todoList) {
		this.input = input;
		this.template = template;
		this.todoList = todoList;
	}

	addItem(event) {
		event.preventDefault();
		if (this.isDuplicate(this.input.value)) {
			return;
		}
		const todoElement = new TodoElement(page.template.content.cloneNode(true));
		todoElement.updateName(this.input.value);
		todoElements.add(todoElement);
		this.addTodoElement(todoElement.domElement);
		this.clearInput();
	}

	clearInput() {
		this.input.value = '';
	}

	addTodoElement(todoElement) {
		this.todoList.appendChild(todoElement);
	}

	isDuplicate(name) {
		return [...todoElements].some(el => el.getName() === name);
	}

	clearItems() {
		todoElements.forEach(el => el.remove());
	}
}

const page = new Page(document.getElementById('input'),
				 	  document.getElementById('todo-el-template'),
					  document.getElementById('todo-list'));
