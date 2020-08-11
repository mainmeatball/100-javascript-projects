import {NameAware} from '../interface/name-aware.interface';

export class GroceryStorage {
    private readonly STORAGE_KEY = 'grocery-list';

    public getNames(): string[] {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]') as string[];
    }

    public add(item: NameAware): void {
        const groceryList = this.getNames();
        groceryList.push(item.getName());
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groceryList));
    }

    public remove(item: NameAware): void {
        const groceryList = this.getNames();
        const itemIndex = groceryList.findIndex((name: string) => item.getName() === name);
        if (itemIndex === -1) {
            throw new Error(`Expected "${item.getName()}" to be present in local storage`);
        }
        groceryList.splice(itemIndex, 1);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groceryList));
    }
}
