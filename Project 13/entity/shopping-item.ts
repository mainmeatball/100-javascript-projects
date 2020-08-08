import {ElementListener} from "./element-listener";
import {ShopValues} from "./shop-values";
import {PriceUtils} from "./price-utils";

export class ShoppingItem {
    public readonly listeners: ElementListener[];

    public static of(element: Element, shopValues: ShopValues): ShoppingItem {
        return new ShoppingItem(
            shopValues,
            <HTMLImageElement>element.querySelector('.cart-item-image'),
            <HTMLParagraphElement>element.querySelector('.cart-item-name'),
            <HTMLParagraphElement>element.querySelector('.cart-item-price'),
            <HTMLButtonElement>element.querySelector('.remove'),
            <HTMLDivElement>element.querySelector('.cart-item')
        );
    };

    private constructor(public shopValues: ShopValues,
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
        this.shopValues.decreaseValues(PriceUtils.numberifyPrice(this.price.textContent!))
    }
}
