import {Shop} from './shop';
import {Grid} from './grid';
import {Card} from './card';
import {Vehicle} from './vehicle';
import {stringifyPrice} from './price-utils';

export class Page {
    constructor(private shop: Shop,
                private grid: Grid) {}

    public setCards(): void {
        Shop.allVehicles
            .map((vehicle: Vehicle) => {
                const clone = this.grid.frameTemplate.content.cloneNode(true) as HTMLElement;
                const card = new Card(
                    clone.querySelector('.frame-image') as HTMLImageElement,
                    clone.querySelector('.name') as HTMLParagraphElement,
                    clone.querySelector('.price') as HTMLParagraphElement,
                    clone.querySelector('.shop-icon') as HTMLDivElement,
                );
                card.img.src = vehicle.img;
                card.name.textContent = vehicle.name;
                card.price.textContent = stringifyPrice(vehicle.price);
                card.shopIcon.addEventListener('click', () => {
                    this.shop.addVehicleToCart(vehicle);
                });
                return clone;
            })
            .forEach(card => this.grid.panel.appendChild(card));
    }

    public toggleShoppingList(): void {
        this.shop.toggleShoppingList();
    }

    public clearShoppingCart(): void {
        this.shop.clearAllItems();
    }
}
