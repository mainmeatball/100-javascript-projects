import {GroceryItemComponent} from '../entity/grocery-item.component';
import {GroceryStorage} from '../helper/grocery-storage.handler';
import {AppElement} from '../model/app-element.enum';
import {select} from '../helper/select';

export class GroceryService {
    private readonly groceryList = select(AppElement.GROCERY_LIST);
    private readonly groceryLocalStorage = new GroceryStorage();
    private items: GroceryItemComponent[] = [];

    public renderLocalStorageItems(): void {
        this.groceryLocalStorage.getNames()
            .forEach((name: string) => this.saveAndRender(new GroceryItemComponent(name)));
    }

    public add(name: string): void {
        const item = new GroceryItemComponent(name);
        this.saveAndRender(item);
        this.groceryLocalStorage.add(item);
    }

    public clearItems(): void {
        // clone because of the array modification while iterating
        const itemsCopy = [...this.items];
        itemsCopy.forEach((item: GroceryItemComponent) => item.remove());
    }

    private saveAndRender(item: GroceryItemComponent): void {
        item.createBound(this.remove.bind(this));
        this.items.push(item);
        item.renderInto(this.groceryList);
    }

    private remove(removeItem: GroceryItemComponent): void {
        this.groceryLocalStorage.remove(removeItem);
        const itemIndex = this.items.findIndex((item: GroceryItemComponent) => item.getName() === removeItem.getName());
        if (itemIndex === -1) {
            return;
        }
        this.items.splice(itemIndex, 1);
    }
}
