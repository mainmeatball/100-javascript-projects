import {Vehicle} from "./vehicle";
import {ShoppingItem} from "./shopping-item";

export class Shop {
    public static cars: Vehicle[] = [
        new Vehicle('../resources/vehicles/car1.jpg', 'Ferrari', '500.000$'),
        new Vehicle('../resources/vehicles/car2.jpg', 'Lamborghini', '499.000$')
    ];

    public static bikes: Vehicle[] = [
        new Vehicle('../resources/vehicles/bike1.jpg', 'Kawasaki', '100.000$'),
        new Vehicle('../resources/vehicles/bike2.jpg', 'Samurai', '99.000$')
    ];

    public static bicycles: Vehicle[] = [
        new Vehicle('../resources/vehicles/bicycle1.jpg', 'Gucci', '5.000$'),
        new Vehicle('../resources/vehicles/bicycle2.jpg', 'Tesla', '10.000$')
    ];

    public static planes: Vehicle[] = [
        new Vehicle('../resources/vehicles/plane1.jpg', 'Boeing', '1.000.000$'),
        new Vehicle('../resources/vehicles/plane2.jpg', 'S7', '900.000$')
    ];

    public static allVehicles: Vehicle[] = [
        ...Shop.cars,
        ...Shop.bikes,
        ...Shop.bicycles,
        ...Shop.planes
    ];

    private totalPrice = 0;
    private totalItems = 0;
    private items: ShoppingItem[] = [];
    private quantity: HTMLParagraphElement;
    private totals: HTMLParagraphElement[];
    cartPreview: HTMLDivElement;
    shoppingWindow: HTMLDivElement;
    private shoppingWindowItemsContainer: HTMLDivElement;
    cartItemTemplate: HTMLTemplateElement;

    constructor(quantity: HTMLParagraphElement,
                totals: HTMLParagraphElement[],
                cartPreview: HTMLDivElement,
                shoppingWindow: HTMLDivElement,
                cartItemTemplate: HTMLTemplateElement) {
        this.quantity = quantity;
        this.totals = totals;
        this.cartPreview = cartPreview;
        this.shoppingWindow = shoppingWindow;
        this.shoppingWindowItemsContainer = <HTMLDivElement>shoppingWindow.querySelector('#items');
        this.cartItemTemplate = cartItemTemplate;
    }

    public addVehicleToCart(item: Vehicle) {
        this.incrementQuantity();
        this.addTotal(+(item.price.replace(/[.$]/g, '')));
        this.addShoppingWindowItem(item);
    }

    private incrementQuantity() {
        this.quantity.textContent = '' + ++this.totalItems;
    }

    decrementQuantity() {
        this.quantity.textContent = '' + --this.totalItems;
    }

    private addTotal(price: number) {
        this.totalPrice += price;
        this.totals.forEach(total => total.textContent = '' + this.totalPrice);
    }

    subtractTotal(price: number) {
        this.totalPrice -= price;
        this.totals.forEach(total => total.textContent = '' + this.totalPrice);
    }

    private nullifyTotal() {
        this.totalPrice = 0;
        this.totals.forEach(total => total.textContent = '' + this.totalPrice);
    }

    private nullifyQuantity() {
        this.totalItems = 0;
        this.quantity.textContent = '0';
    }

    private addShoppingWindowItem(item: Vehicle) {
        const newItem = <Element>this.cartItemTemplate.content.cloneNode(true);
        const shoppingItem = ShoppingItem.of(newItem, this);
        shoppingItem.image.src = item.img;
        shoppingItem.name.textContent = item.name;
        shoppingItem.price.textContent = item.price;
        this.items.push(shoppingItem);
        this.shoppingWindowItemsContainer.appendChild(newItem);
    }

    clearAllItems() {
        this.items.forEach(item => item.removeItem());
        this.nullifyQuantity();
        this.nullifyTotal();
    }
}
