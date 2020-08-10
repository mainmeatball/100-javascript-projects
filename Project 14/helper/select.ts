import { AppElement } from '../model/app-element.enum';

export function select(target: AppElement.GROCERY_ITEM_TEMPLATE, container?: HTMLElement): HTMLTemplateElement;
export function select(target: AppElement.INPUT_FIELD, container?: HTMLElement): HTMLInputElement;
export function select(target: AppElement.GROCERY_ITEM_REMOVE_BUTTON, container?: HTMLElement): HTMLButtonElement;
export function select(target: AppElement, container?: HTMLElement): HTMLElement;
export function select(target: AppElement, container?: HTMLElement): HTMLElement {
    const element = (container || document).querySelector(`${target}`) as HTMLElement;
    if (!element) {
        throw new Error(`Expected "${target}" to be available in DOM`);
    }
    return element;
}
