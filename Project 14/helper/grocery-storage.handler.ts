import {NameAware} from "../interface/name-aware.interface";

export class GroceryStorage {
    private readonly STORAGE_KEY = 'grocery-list';

    public getGroceryListNames(): string[] {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
    }

    public addItem(item: NameAware) {
        const groceryList = this.getGroceryListNames();
        groceryList.push(item.getName());
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groceryList));
    }

    public removeItem(item: NameAware) {
        const groceryList = this.getGroceryListNames();
        const itemIndex = groceryList.findIndex((name: string) => item.getName() === name);
        groceryList.splice(itemIndex, 1);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groceryList));
    }
}
