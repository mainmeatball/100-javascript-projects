import {ElementListener} from './element-listener';
import {ShopValues} from './shop-values';
import {numberifyPrice} from './price-utils';

export class ShoppingItem {
    public readonly listeners: ElementListener[];

    public static of(element: Element, shopValues: ShopValues): ShoppingItem {
        return new ShoppingItem(
            shopValues,
            element.querySelector('.cart-item-image') as HTMLImageElement,
            element.querySelector('.cart-item-name') as HTMLParagraphElement,
            element.querySelector('.cart-item-price') as HTMLParagraphElement,
            element.querySelector('.remove') as HTMLButtonElement,
            element.querySelector('.cart-item') as HTMLDivElement
        );
    }

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
        this.shopValues.decreaseValues(numberifyPrice(this.price.textContent || ''));
    }
}
