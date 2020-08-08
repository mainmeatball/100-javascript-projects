import {ElementListener} from "./element-listener";
import {Shop} from "./shop";

export class ShoppingItem {
    public readonly listeners: ElementListener[];

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

    private constructor(public shop: Shop,
                        public image: HTMLImageElement,
                        public name: HTMLParagraphElement,
                        public price: HTMLParagraphElement,
                        public removeButton: HTMLButtonElement,
                        public domElement: HTMLDivElement) {
        this.listeners = [
            new ElementListener(this.removeButton, 'click', this.removeItem.bind(this)),
        ];
        this.listeners.forEach(el => el.listen());
    }

    public removeItem(): void {
        this.listeners.forEach(el => el.removeListener());
        this.domElement.remove();
        this.shop.subtractTotal(+(this.price.textContent?.replace(/[.$]/g, '') || ''))
        this.shop.decrementQuantity();
    }
}
