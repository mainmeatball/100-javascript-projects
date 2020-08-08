export namespace Project13 {
    export class ElementListener {
        private field: HTMLElement;
        private readonly name: string;
        private readonly boundCallback: () => void;

        constructor(field: HTMLElement, name: string, boundCallback: () => void) {
            this.field = field;
            this.name = name;
            this.boundCallback = boundCallback;
        }

        public listen() {
            this.field.addEventListener(this.name, this.boundCallback);
        }

        public removeListener() {
            this.field.removeEventListener(this.name, this.boundCallback);
        }
    }
}
