import {select} from './helper/select';
import {CourseService} from './service/course.service';
import {AppElement} from './model/app-element.enum';

const nameInput = select(AppElement.NAME_INPUT) as HTMLInputElement;
const courseInput = select(AppElement.COURSE_INPUT) as HTMLInputElement;
const authorInput = select(AppElement.AUTHOR_INPUT) as HTMLInputElement;
const courseService = new CourseService();

export function addCourse(): void {
    const name = nameInput.value || '';
    const course = courseInput.value || '';
    const author = authorInput.value || '';
    courseService.add(name, course, author);
    nameInput.value = '';
    courseInput.value = '';
    authorInput.value = '';
}
