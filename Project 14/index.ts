import './index.scss';
import {select} from "./helper/select";
import {GroceryService} from "./service/grocery.service";
import {AppElement} from "./model/app-element.enum";

const input = select(AppElement.INPUT_FIELD);
const groceryService = new GroceryService();

renderLocalStorageData();

function renderLocalStorageData(): void {
    groceryService.renderLocalStorageItems();
}

export function addItem(): void {
    const name = input.value || '';
    groceryService.addItem(name);
    input.value = '';
    input.focus();
}

export function clearItems(): void {
    groceryService.clearItems();
}
