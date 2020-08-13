import { AppElement } from '../model/app-element.enum';

export function select(target: AppElement.COURSE_CARD_TEMPLATE, container?: HTMLElement): HTMLTemplateElement;
export function select(target: AppElement.COURSE_CARD_IMAGE, container?: HTMLElement): HTMLImageElement;
export function select(target: AppElement, container?: HTMLElement): HTMLElement;
export function select(target: AppElement, container?: HTMLElement): HTMLElement {
    const element = (container || document).querySelector(`${target}`) as HTMLElement;
    if (!element) {
        throw new Error(`Expected "${target}" to be available in DOM`);
    }
    return element;
}
