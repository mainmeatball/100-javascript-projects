import {GroceryItemComponent} from "../entity/grocery-item.component";
import {GroceryStorage} from "../helper/grocery-storage.handler";
import {AppElement} from "../model/app-element.enum";
import {select} from "../helper/select";

export class GroceryService {
    private readonly groceryList = select(AppElement.GROCERY_LIST);
    private readonly groceryLocalStorage = new GroceryStorage();
    private items: GroceryItemComponent[] = [];

    public renderLocalStorageItems(): void {
        const localStorageItems = this.groceryLocalStorage.getNames()
            .map((name: string) => {
                const item = GroceryItemComponent.of(name);
                item.createBound(this.remove.bind(this));
                this.items.push(item);
                return item;
            });
        this.render(...localStorageItems);
    }

    public add(name: string): void {
        const item = GroceryItemComponent.of(name);
        item.createBound(this.remove.bind(this));
        this.render(item);
        this.groceryLocalStorage.add(item);
        this.items.push(item);
    }

    public clearItems(): void {
        // clone because of the array modification while iterating
        const itemsCopy = [...this.items];
        itemsCopy.forEach((item: GroceryItemComponent) => {
            item.remove()
        });
    }

    private render(...items: GroceryItemComponent[]): void {
        this.groceryList.append(...items.map(item => item.domElement));
    }

    private remove(removeItem: GroceryItemComponent): void {
        this.groceryLocalStorage.remove(removeItem);
        const itemIndex = this.items.findIndex((item: GroceryItemComponent) => item.getName() === removeItem.getName());
        if (itemIndex === -1) {
            throw new Error(`Expected "${removeItem}" to be present in local array`);
        }
        this.items.splice(itemIndex, 1);
    }
}
