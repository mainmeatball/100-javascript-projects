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
            this.boundCallbackFn = () => true;
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
            this.boundCallbackFn(this);
        }
        setName(name) {
            this.name.textContent = name;
            return this;
        }
        getName() {
            return this.name.textContent;
        }
        createBound(callbackFn) {
            this.boundCallbackFn = callbackFn;
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
        getNames() {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
        }
        add(item) {
            const groceryList = this.getNames();
            groceryList.push(item.getName());
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groceryList));
        }
        remove(item) {
            const groceryList = this.getNames();
            const itemIndex = groceryList.findIndex((name) => item.getName() === name);
            if (itemIndex === -1) {
                throw new Error(`Expected "${item.getName()}" to be present in local storage`);
            }
            groceryList.splice(itemIndex, 1);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groceryList));
        }
    }

    class GroceryService {
        constructor() {
            this.groceryList = select(AppElement.GROCERY_LIST);
            this.items = new Map();
            this.groceryLocalStorage = new GroceryStorage();
        }
        renderLocalStorageItems() {
            const localStorageItems = this.groceryLocalStorage.getNames()
                .map((name) => {
                const item = GroceryItemComponent.of(name);
                item.createBound(this.remove.bind(this));
                this.items.set(name, item);
                return item;
            });
            this.render(...localStorageItems);
        }
        render(...items) {
            this.groceryList.append(...items.map(item => item.domElement));
        }
        add(name) {
            const item = GroceryItemComponent.of(name);
            item.setName(name);
            item.createBound(this.remove.bind(this));
            this.render(item);
            this.groceryLocalStorage.add(item);
            this.items.set(name, item);
        }
        clearItems() {
            this.getItems().forEach((item) => item.remove());
        }
        getItems() {
            return Array.from(this.items.values());
        }
        remove(item) {
            this.groceryLocalStorage.remove(item);
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
        groceryService.add(name);
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
