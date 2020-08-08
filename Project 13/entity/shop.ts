import {Vehicle} from "./vehicle";
import {ShoppingItem} from "./shopping-item";
import {ShopValues} from "./shop-values";

export class Shop {
    public static cars: Vehicle[] = [
        new Vehicle('../resources/vehicles/car1.jpg', 'Ferrari', 500_000),
        new Vehicle('../resources/vehicles/car2.jpg', 'Lamborghini', 499_000)
    ];

    public static bikes: Vehicle[] = [
        new Vehicle('../resources/vehicles/bike1.jpg', 'Kawasaki', 100_000),
        new Vehicle('../resources/vehicles/bike2.jpg', 'Samurai', 99_000)
    ];

    public static bicycles: Vehicle[] = [
        new Vehicle('../resources/vehicles/bicycle1.jpg', 'Gucci', 5_000),
        new Vehicle('../resources/vehicles/bicycle2.jpg', 'Tesla', 10_000)
    ];

    public static planes: Vehicle[] = [
        new Vehicle('../resources/vehicles/plane1.jpg', 'Boeing', 1_000_000),
        new Vehicle('../resources/vehicles/plane2.jpg', 'S7', 900_000)
    ];

    public static allVehicles: Vehicle[] = [
        ...Shop.cars,
        ...Shop.bikes,
        ...Shop.bicycles,
        ...Shop.planes
    ];

    private readonly items: ShoppingItem[] = [];
    private readonly shoppingWindowItemsContainer = <HTMLDivElement>this.shoppingWindow.querySelector('#items');

    constructor(public shoppingWindow: HTMLDivElement,
                public cartItemTemplate: HTMLTemplateElement,
                public shopValues: ShopValues) {}

    public addVehicleToCart(item: Vehicle): void {
        this.shopValues.increaseValues(item.price);
        this.addShoppingWindowItem(item);
    }

    public clearAllItems(): void {
        this.items.forEach(item => item.removeItem());
        this.shopValues.nullifyValues();
    }

    public toggleShoppingList() {
        this.shoppingWindow.classList.toggle('move-x');
    }

    private addShoppingWindowItem(item: Vehicle): void {
        const newItem = <Element>this.cartItemTemplate.content.cloneNode(true);
        const shoppingItem = ShoppingItem.of(newItem, this.shopValues);
        shoppingItem.image.src = item.img;
        shoppingItem.name.textContent = item.name;
        shoppingItem.price.textContent = ShopValues.stringifyPrice(item.price);
        this.items.push(shoppingItem);
        this.shoppingWindowItemsContainer.appendChild(newItem);
    }
}
