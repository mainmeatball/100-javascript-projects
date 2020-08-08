import {Shop} from "./shop";
import {Grid} from "./grid";
import {Card} from "./card";
import {Vehicle} from "./vehicle";

export class Page {
    constructor(private shop: Shop,
                private grid: Grid) {}

    setCards(): void {
        Shop.allVehicles
            .map((vehicle: Vehicle) => {
                const clone = <Element>this.grid.frameTemplate.content.cloneNode(true);
                const card = new Card(
                    <HTMLImageElement>clone.querySelector('.frame-image'),
                    <HTMLParagraphElement>clone.querySelector('.name'),
                    <HTMLParagraphElement>clone.querySelector('.price'),
                    <HTMLDivElement>clone.querySelector('.shop-icon'),
                );
                card.img.src = vehicle.img;
                card.name.textContent = vehicle.name;
                card.price.textContent = vehicle.price;
                card.shopIcon.addEventListener('click', () => {
                    this.shop.addVehicleToCart(vehicle);
                });
                return clone;
            })
            .forEach(card => this.grid.panel.appendChild(card));
    }

    toggleShoppingList(): void {
        this.shop.toggleShoppingList();
    }

    clearShoppingCart(): void {
        this.shop.clearAllItems();
    }
}
