import {NameAware} from "../interface/name-aware.interface";
import {AppElement} from "../model/app-element.enum";
import {select} from "../helper/select";
import {Callback} from "../model/callback.type";

export class GroceryItemComponent implements NameAware {
    private boundCallbackFn: Callback<GroceryItemComponent> = () => true;
    private readonly boundRemoveButtonFn = this.remove.bind(this);
    private readonly name: HTMLElement;
    private readonly removeButton: HTMLButtonElement;
    private readonly domElement: HTMLElement;

    public constructor(name: string) {
        const template = select(AppElement.GROCERY_ITEM_TEMPLATE).content.cloneNode(true) as HTMLElement;
        this.name = select(AppElement.GROCERY_ITEM_NAME, template);
        this.removeButton = select(AppElement.GROCERY_ITEM_REMOVE_BUTTON, template);
        this.domElement = select(AppElement.GROCERY_ITEM, template);
        this.name.textContent = name;
        this.removeButton.addEventListener('click', this.boundRemoveButtonFn);
    }

    public remove(): void {
        this.removeButton.removeEventListener('click', this.boundRemoveButtonFn);
        this.domElement.remove();
        this.boundCallbackFn(this);
    }

    public getName(): string {
        return this.name.textContent!;
    }

    public createBound(callbackFn: Callback<GroceryItemComponent>): void {
        this.boundCallbackFn = callbackFn;
    }

    public renderInto(container: HTMLElement): void {
        container.appendChild(this.domElement);
    }
}
