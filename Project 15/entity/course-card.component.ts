import {AppElement} from '../model/app-element.enum';
import {select} from '../helper/select';

export class CourseCardComponent {
    private readonly domElement: HTMLElement;

    constructor(imageSrc: string, name: string, course: string, author: string) {
        const template = select(AppElement.COURSE_CARD_TEMPLATE).content.cloneNode(true) as HTMLElement;
        select(AppElement.COURSE_CARD_IMAGE, template).src = imageSrc;
        select(AppElement.COURSE_CARD_NAME, template).textContent = name;
        select(AppElement.COURSE_CARD_COURSE, template).textContent = course;
        select(AppElement.COURSE_CARD_AUTHOR, template).textContent = author;
        this.domElement = select(AppElement.COURSE_CARD, template);
    }

    public renderInto(container: HTMLElement): void {
        container.appendChild(this.domElement);
    }
}
