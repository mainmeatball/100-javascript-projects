export class ShopValues {
    constructor(private quantity: HTMLElement,
                private totals: HTMLElement[],
                private totalPrice = 0,
                private totalItems = 0) {}

    public decreaseValues(price: number): void {
        this.decrementQuantity();
        this.subtractTotal(price);
    }

    public increaseValues(price: number): void {
        this.incrementQuantity();
        this.addTotal(price);
    }

    public nullifyValues(): void {
        this.nullifyTotal();
        this.nullifyQuantity();
    }

    private incrementQuantity(): void {
        this.quantity.textContent = `${++this.totalItems}`;
    }

    private addTotal(price: number): void {
        this.totalPrice += price;
        this.totals.forEach(total => total.textContent = `${this.totalPrice}`);
    }

    private decrementQuantity(): void {
        this.quantity.textContent = `${--this.totalItems}`;
    }

    private subtractTotal(price: number): void {
        this.totalPrice -= price;
        this.totals.forEach(total => total.textContent = `${this.totalPrice}`);
    }

    private nullifyTotal(): void {
        this.totalPrice = 0;
        this.totals.forEach(total => total.textContent = `${this.totalPrice}`);
    }

    private nullifyQuantity(): void {
        this.totalItems = 0;
        this.quantity.textContent = '0';
    }
}
