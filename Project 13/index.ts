import {Grid} from "./entity/grid";
import {Shop} from "./entity/shop";
import {Page} from "./entity/page";
import {ShopValues} from "./entity/shop-values";

const shopValues = new ShopValues(
    <HTMLElement>document.getElementById('quantity'),
    <HTMLElement[]>Array.from(document.getElementsByClassName('amount'))
)

const shop = new Shop(
    <HTMLDivElement>document.getElementById('shopping-window'),
    <HTMLTemplateElement>document.getElementById('cart-item-template'),
    shopValues
);

const grid = new Grid(
    <HTMLDivElement>document.getElementById('flex-grid'),
    <HTMLTemplateElement>document.getElementById('frame-template')
);

export const page = new Page(shop, grid);
