export class Card {
    img: HTMLImageElement;
    name: HTMLParagraphElement;
    price: HTMLParagraphElement;
    shopIcon: HTMLDivElement;

    constructor(img: HTMLImageElement,
                name: HTMLParagraphElement,
                price: HTMLParagraphElement,
                shopIcon: HTMLDivElement) {
        this.img = img;
        this.name = name;
        this.price = price;
        this.shopIcon = shopIcon;
    }
}
