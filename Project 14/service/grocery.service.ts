import {GroceryItemComponent} from "../entity/grocery-item.component";
import {GroceryStorage} from "../helper/grocery-storage.handler";
import {AppElement} from "../model/app-element.enum";
import {select} from "../helper/select";

export class GroceryService {
    private readonly groceryList = select(AppElement.GROCERY_LIST);
    private readonly items = new Map<string, GroceryItemComponent>();
    private readonly groceryLocalStorage = new GroceryStorage();

    public renderLocalStorageItems(): void {
        const localStorageItems = this.groceryLocalStorage.getNames()
            .map((name: string) => {
                const item = GroceryItemComponent.of(name);
                item.createBound(this.remove.bind(this));
                this.items.set(name, item);
                return item;
            });
        this.render(...localStorageItems);
    }

    public render(...items: GroceryItemComponent[]): void {
        this.groceryList.append(...items.map(item => item.domElement));
    }

    public add(name: string): void {
        const item = GroceryItemComponent.of(name);
        item.setName(name);
        item.createBound(this.remove.bind(this));
        this.render(item);
        this.groceryLocalStorage.add(item);
        this.items.set(name, item);
    }

    public clearItems(): void {
        this.getItems().forEach((item: GroceryItemComponent) => item.remove());
    }

    private getItems(): GroceryItemComponent[] {
        return Array.from(this.items.values());
    }

    private remove(item: GroceryItemComponent): void {
        this.groceryLocalStorage.remove(item);
        this.items.delete(item.getName());
    }
}
