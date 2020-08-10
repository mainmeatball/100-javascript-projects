import {NameAware} from "../interface/name-aware.interface";
import {AppElement} from "../model/app-element.enum";
import {select} from "../helper/select";
import {Callback} from "../model/callback.type";

export class GroceryItemComponent implements NameAware {
    private readonly boundRemoveButtonFn = this.remove.bind(this);
    private boundCallbackFn: Callback<GroceryItemComponent> = () => true;

    public static of(name: string): GroceryItemComponent {
        const template = select(AppElement.GROCERY_ITEM_TEMPLATE).content.cloneNode(true) as HTMLElement;
        return this.ofTemplate(template).setName(name);
    }

    private static ofTemplate(template: HTMLElement): GroceryItemComponent {
        return new GroceryItemComponent(
            select(AppElement.GROCERY_ITEM_NAME, template),
            select(AppElement.GROCERY_ITEM_REMOVE_BUTTON, template),
            select(AppElement.GROCERY_ITEM, template)
        );
    }

    private constructor(private name: HTMLElement,
                        private removeButton: HTMLButtonElement,
                        public domElement: HTMLElement) {
        this.listen();
    }

    public remove(): void {
        this.removeListener();
        this.domElement.remove();
        this.boundCallbackFn(this);
    }

    public setName(name: string): GroceryItemComponent {
        this.name.textContent = name;
        return this;
    }

    public getName(): string {
        return this.name.textContent!;
    }

    public createBound(callbackFn: Callback<GroceryItemComponent>): void {
        this.boundCallbackFn = callbackFn;
    }

    private listen(): void {
        this.removeButton.addEventListener('click', this.boundRemoveButtonFn);
    }

    private removeListener(): void {
        this.removeButton.removeEventListener('click', this.boundRemoveButtonFn);
    }
}
