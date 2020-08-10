import {GroceryItemComponent} from "../entity/grocery-item.component";
import {GroceryStorage} from "../helper/grocery-storage.handler";
import {AppElement} from "../model/app-element.enum";
import {select} from "../helper/select";

export class GroceryService {
    private readonly groceryList = select(AppElement.GROCERY_LIST);
    private readonly items = new Map<string, GroceryItemComponent>();
    private readonly localStorage = new GroceryStorage();

    public renderLocalStorageItems(): void {
        const localStorageItems = this.localStorage.getGroceryListNames()
            .map((name: string) => {
                const item = GroceryItemComponent.of(name);
                item.bind(this.removeItem.bind(this));
                this.items.set(name, item);
                return item;
            });
        this.renderItems(...localStorageItems);
    }

    public renderItems(...items: GroceryItemComponent[]): void {
        this.groceryList.append(...items.map(item => item.domElement));
    }

    public renderItem(item: GroceryItemComponent): void {
        this.groceryList.appendChild(item.domElement);
    }

    public addItem(name: string): void {
        const item = GroceryItemComponent.of(name);
        item.setName(name);
        item.bind(this.removeItem.bind(this));
        this.renderItem(item);
        this.localStorage.addItem(item);
        this.items.set(name, item);
    }

    public clearItems(): void {
        this.getItems().forEach((item: GroceryItemComponent) => item.remove());
    }

    private getItems(): GroceryItemComponent[] {
        return Array.from(this.items.values());
    }

    private removeItem(item: GroceryItemComponent): void {
        this.localStorage.removeItem(item);
        this.items.delete(item.getName());
    }
}
