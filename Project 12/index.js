const todoElements = new Set();

class ElementListener {
	constructor(field, name, boundCallback) {
		this.field = field;
		this.name = name;
		this.boundCallback = boundCallback;
	}

	listen() {
		this.field.addEventListener(this.name, this.boundCallback);
	}

	removeListener() {
		this.field.removeEventListener(this.name, this.boundCallback);
	}
}

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

		this.listeners = [new ElementListener(this.nameInput, 'focusout', this.boundInputListenerCallback),
						  new ElementListener(this.checkButton, 'click', this.boundCheckButtonListenerCallback),
						  new ElementListener(this.editButton, 'click', this.boundEditButtonListenerCallback),
						  new ElementListener(this.removeButton, 'click', this.boundRemoveButtonListenerCallback)];
		this.listeners.forEach(el => el.listen());
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
		this.listeners.forEach(el => el.removeListener());
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
