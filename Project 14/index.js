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
        constructor(name) {
            this.boundCallbackFn = () => true;
            this.boundRemoveButtonFn = this.remove.bind(this);
            const template = select(AppElement.GROCERY_ITEM_TEMPLATE).content.cloneNode(true);
            this.name = select(AppElement.GROCERY_ITEM_NAME, template);
            this.removeButton = select(AppElement.GROCERY_ITEM_REMOVE_BUTTON, template);
            this.domElement = select(AppElement.GROCERY_ITEM, template);
            this.name.textContent = name;
            this.removeButton.addEventListener('click', this.boundRemoveButtonFn);
        }
        remove() {
            this.removeButton.removeEventListener('click', this.boundRemoveButtonFn);
            this.domElement.remove();
            this.boundCallbackFn(this);
        }
        getName() {
            return this.name.textContent;
        }
        createBound(callbackFn) {
            this.boundCallbackFn = callbackFn;
        }
        renderInto(container) {
            container.appendChild(this.domElement);
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
            this.groceryLocalStorage = new GroceryStorage();
            this.items = [];
        }
        renderLocalStorageItems() {
            this.groceryLocalStorage.getNames()
                .forEach((name) => this.saveAndRender(new GroceryItemComponent(name)));
        }
        add(name) {
            const item = new GroceryItemComponent(name);
            this.saveAndRender(item);
            this.groceryLocalStorage.add(item);
        }
        clearItems() {
            // clone because of the array modification while iterating
            const itemsCopy = [...this.items];
            itemsCopy.forEach((item) => item.remove());
        }
        saveAndRender(item) {
            item.createBound(this.remove.bind(this));
            this.items.push(item);
            item.renderInto(this.groceryList);
        }
        remove(removeItem) {
            this.groceryLocalStorage.remove(removeItem);
            const itemIndex = this.items.findIndex((item) => item.getName() === removeItem.getName());
            if (itemIndex === -1) {
                return;
            }
            this.items.splice(itemIndex, 1);
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
