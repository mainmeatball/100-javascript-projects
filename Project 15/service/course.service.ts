import {CourseCardComponent} from '../entity/course-card.component';
import {AppElement} from '../model/app-element.enum';
import {select} from '../helper/select';

export class CourseService {
    private readonly coursesMasonry = select(AppElement.COURSES_MASONRY);
    private static readonly RANDOM_IMAGE_SOURCE = 'https://source.unsplash.com/random';

    public add(name: string, course: string, author: string): void {
        // For generating random image every time browser sends request
        const cacheBooster = `?cb=` + Math.floor(Math.random() * 50000);
        const courseCard = new CourseCardComponent(CourseService.RANDOM_IMAGE_SOURCE + cacheBooster, name, course, author);
        courseCard.renderInto(this.coursesMasonry);
    }
}
