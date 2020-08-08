import {Grid} from "./entity/grid";
import {Shop} from "./entity/shop";
import {Page} from "./entity/page";

const shop = new Shop(
    <HTMLParagraphElement>document.getElementById('quantity'),
    <HTMLParagraphElement[]>Array.from(document.getElementsByClassName('amount')),
    <HTMLDivElement>document.getElementById('shopping-window'),
    <HTMLTemplateElement>document.getElementById('cart-item-template')
);

const grid = new Grid(
    <HTMLDivElement>document.getElementById('flex-grid'),
    <HTMLTemplateElement>document.getElementById('frame-template')
);

export const page = new Page(shop, grid);
