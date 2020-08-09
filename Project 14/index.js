var app = (function (exports) {
    'use strict';

    function select(target, container) {
        const element = (container || document).querySelector(`${target}`);
        if (!element) {
            throw new Error(`Expected "${target}" to be available in DOM`);
        }
        return element;
    }

    var AppElement;
    (function (AppElement) {
        AppElement["INPUT_FIELD"] = "#input-field";
        AppElement["GROCERY_LIST"] = "#grocery-list";
        // Grocery list related attributes
        AppElement["GROCERY_ITEM_TEMPLATE"] = "#grocery-item-template";
        AppElement["GROCERY_ITEM"] = ".grocery-item";
        AppElement["GROCERY_ITEM_NAME"] = ".grocery-item-name";
        AppElement["GROCERY_ITEM_REMOVE_BUTTON"] = ".grocery-item-remove-button";
    })(AppElement || (AppElement = {}));

    class GroceryItemComponent {
        constructor(name, removeButton, domElement) {
            this.name = name;
            this.removeButton = removeButton;
            this.domElement = domElement;
            this.boundRemoveButtonFn = this.remove.bind(this);
            this.boundLocalStorageFn = () => true;
            this.listen();
        }
        static of(name) {
            const template = select(AppElement.GROCERY_ITEM_TEMPLATE).content.cloneNode(true);
            return this.ofTemplate(template).setName(name);
        }
        static ofTemplate(template) {
            return new GroceryItemComponent(select(AppElement.GROCERY_ITEM_NAME, template), select(AppElement.GROCERY_ITEM_REMOVE_BUTTON, template), select(AppElement.GROCERY_ITEM, template));
        }
        remove() {
            this.removeListener();
            this.domElement.remove();
            if (this.boundLocalStorageFn) {
                this.boundLocalStorageFn(this);
            }
        }
        setName(name) {
            this.name.textContent = name;
            return this;
        }
        getName() {
            return this.name.textContent;
        }
        bind(removeFromLocalStorageFn) {
            this.boundLocalStorageFn = removeFromLocalStorageFn;
        }
        listen() {
            this.removeButton.addEventListener('click', this.boundRemoveButtonFn);
        }
        removeListener() {
            this.removeButton.removeEventListener('click', this.boundRemoveButtonFn);
        }
    }

    class GroceryStorage {
        constructor() {
            this.STORAGE_KEY = 'grocery-list';
        }
        getGroceryListNames() {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
        }
        addItem(item) {
            const groceryList = this.getGroceryListNames();
            groceryList.push(item.getName());
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groceryList));
        }
        removeItem(item) {
            const groceryList = this.getGroceryListNames();
            const itemIndex = groceryList.findIndex((name) => item.getName() === name);
            groceryList.splice(itemIndex, 1);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groceryList));
        }
    }

    class GroceryService {
        constructor() {
            this.groceryList = select(AppElement.GROCERY_LIST);
            this.items = new Map();
            this.localStorage = new GroceryStorage();
        }
        renderLocalStorageItems() {
            const localStorageItems = this.localStorage.getGroceryListNames()
                .map((name) => {
                const item = GroceryItemComponent.of(name);
                item.bind(this.removeItem.bind(this));
                this.items.set(name, item);
                return item;
            });
            this.renderItems(...localStorageItems);
        }
        renderItems(...items) {
            this.groceryList.append(...items.map(item => item.domElement));
        }
        renderItem(item) {
            this.groceryList.appendChild(item.domElement);
        }
        addItem(name) {
            const item = GroceryItemComponent.of(name);
            item.setName(name);
            item.bind(this.removeItem.bind(this));
            this.renderItem(item);
            this.localStorage.addItem(item);
            this.items.set(name, item);
        }
        clearItems() {
            this.getItems().forEach((item) => item.remove());
        }
        getItems() {
            return Array.from(this.items.values());
        }
        removeItem(item) {
            this.localStorage.removeItem(item);
            this.items.delete(item.getName());
        }
    }

    const input = select(AppElement.INPUT_FIELD);
    const groceryService = new GroceryService();
    renderLocalStorageData();
    function renderLocalStorageData() {
        groceryService.renderLocalStorageItems();
    }
    function addItem() {
        const name = input.value || '';
        groceryService.addItem(name);
        input.value = '';
        input.focus();
    }
    function clearItems() {
        groceryService.clearItems();
    }

    exports.addItem = addItem;
    exports.clearItems = clearItems;

    return exports;

}({}));
