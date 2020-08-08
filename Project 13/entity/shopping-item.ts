import {ElementListener} from "./element-listener";
import {Shop} from "./shop";

export class ShoppingItem {
    shop: Shop;
    image: HTMLImageElement;
    name: HTMLParagraphElement;
    price: HTMLParagraphElement;
    removeButton: HTMLButtonElement;
    domElement: HTMLDivElement;
    listeners: ElementListener[];

    public static of(element: Element, shop: Shop): ShoppingItem {
        return new ShoppingItem(
            shop,
            <HTMLImageElement>element.querySelector('.cart-item-image'),
            <HTMLParagraphElement>element.querySelector('.cart-item-name'),
            <HTMLParagraphElement>element.querySelector('.cart-item-price'),
            <HTMLButtonElement>element.querySelector('.remove'),
            <HTMLDivElement>element.querySelector('.cart-item')
        );
    };

    private constructor(shop: Shop,
                        image: HTMLImageElement,
                        name: HTMLParagraphElement,
                        price: HTMLParagraphElement,
                        removeButton: HTMLButtonElement,
                        domElement: HTMLDivElement) {
        this.shop = shop;
        this.image = image;
        this.name = name;
        this.price = price;
        this.removeButton = removeButton;
        this.domElement = domElement;

        this.listeners = [
            new ElementListener(this.removeButton, 'click', this.removeItem.bind(this)),
        ];
        this.listeners.forEach(el => el.listen());
    }

    removeItem() {
        this.listeners.forEach(el => el.removeListener());
        this.domElement.remove();
        this.shop.subtractTotal(+(this.price.textContent?.replace(/[.$]/g, '') || ''))
        this.shop.decrementQuantity();
    }
}
