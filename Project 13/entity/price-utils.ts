export class PriceUtils {
    public static numberifyPrice(price: string): number {
        return +price.replace(/[.$]/g, '');
    }

    public static stringifyPrice(price: number): string {
        return `${price}`.split(/(?=(?:...)*$)/).join('.') + '$';
    }
}
