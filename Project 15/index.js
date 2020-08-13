var app = (function (exports) {
    'use strict';

    function select(target, container) {
        const element = (container || document).querySelector(`${target}`);
        if (!element) {
            throw new Error(`Expected "${target}" to be available in DOM`);
        }
        return element;
    }

    var AppElement;
    (function (AppElement) {
        AppElement["NAME_INPUT"] = "#name-input";
        AppElement["COURSE_INPUT"] = "#course-input";
        AppElement["AUTHOR_INPUT"] = "#author-input";
        AppElement["COURSES_MASONRY"] = "#courses-masonry";
        // Grocery list related attributes
        AppElement["COURSE_CARD_TEMPLATE"] = "#course-card-template";
        AppElement["COURSE_CARD"] = ".course-card";
        AppElement["COURSE_CARD_IMAGE"] = ".course-card-image";
        AppElement["COURSE_CARD_NAME"] = ".course-card-name";
        AppElement["COURSE_CARD_COURSE"] = ".course-card-course";
        AppElement["COURSE_CARD_AUTHOR"] = ".course-card-author";
    })(AppElement || (AppElement = {}));

    class CourseCardComponent {
        constructor(imageSrc, name, course, author) {
            const template = select(AppElement.COURSE_CARD_TEMPLATE).content.cloneNode(true);
            select(AppElement.COURSE_CARD_IMAGE, template).src = imageSrc;
            select(AppElement.COURSE_CARD_NAME, template).textContent = name;
            select(AppElement.COURSE_CARD_COURSE, template).textContent = course;
            select(AppElement.COURSE_CARD_AUTHOR, template).textContent = author;
            this.domElement = select(AppElement.COURSE_CARD, template);
        }
        renderInto(container) {
            container.appendChild(this.domElement);
        }
    }

    class CourseService {
        constructor() {
            this.coursesMasonry = select(AppElement.COURSES_MASONRY);
        }
        add(name, course, author) {
            // For generating random image every time browser sends request
            const cacheBooster = `?cb=` + Math.floor(Math.random() * 50000);
            const courseCard = new CourseCardComponent(CourseService.RANDOM_IMAGE_SOURCE + cacheBooster, name, course, author);
            this.saveAndRender(courseCard);
        }
        saveAndRender(item) {
            item.renderInto(this.coursesMasonry);
        }
    }
    CourseService.RANDOM_IMAGE_SOURCE = 'https://source.unsplash.com/random';

    const nameInput = select(AppElement.NAME_INPUT);
    const courseInput = select(AppElement.COURSE_INPUT);
    const authorInput = select(AppElement.AUTHOR_INPUT);
    const courseService = new CourseService();
    function addCourse() {
        const name = nameInput.value || '';
        const course = courseInput.value || '';
        const author = authorInput.value || '';
        courseService.add(name, course, author);
        nameInput.value = '';
        courseInput.value = '';
        authorInput.value = '';
    }

    exports.addCourse = addCourse;

    return exports;

}({}));
