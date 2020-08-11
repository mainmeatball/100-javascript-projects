export function numberifyPrice(price: string): number {
    return +price.replace(/[.$]/g, '');
}

export function stringifyPrice(price: number): string {
    return `${price}`.split(/(?=(?:...)*$)/).join('.') + '$';
}
