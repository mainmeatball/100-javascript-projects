import {AppElement} from '../model/app-element.enum';
import {select} from '../helper/select';

export class CourseCardComponent {
    private readonly image: HTMLImageElement;
    private readonly name: HTMLElement;
    private readonly course: HTMLElement;
    private readonly author: HTMLElement;
    private readonly domElement: HTMLElement;

    constructor(imageSrc: string, name: string, course: string, author: string) {
        const template = select(AppElement.COURSE_CARD_TEMPLATE).content.cloneNode(true) as HTMLElement;
        this.image = select(AppElement.COURSE_CARD_IMAGE, template);
        this.name = select(AppElement.COURSE_CARD_NAME, template);
        this.course = select(AppElement.COURSE_CARD_COURSE, template);
        this.author = select(AppElement.COURSE_CARD_AUTHOR, template);
        this.domElement = select(AppElement.COURSE_CARD, template);
        this.image.src = imageSrc;
        this.name.textContent = name;
        this.course.textContent = course;
        this.author.textContent = author;
    }

    public renderInto(container: HTMLElement): void {
        container.appendChild(this.domElement);
    }
}
