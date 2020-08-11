import './index.scss';
import {Grid} from './entity/grid';
import {Shop} from './entity/shop';
import {Page} from './entity/page';
import {ShopValues} from './entity/shop-values';

const shopValues = new ShopValues(
    document.getElementById('quantity') as HTMLElement,
    Array.from(document.getElementsByClassName('amount')) as HTMLElement[]
);

const shop = new Shop(
    document.getElementById('shopping-window') as HTMLDivElement,
    document.getElementById('cart-item-template') as HTMLTemplateElement,
    shopValues
);

const grid = new Grid(
    document.getElementById('flex-grid') as HTMLDivElement,
    document.getElementById('frame-template') as HTMLTemplateElement
);

export const page = new Page(shop, grid);
