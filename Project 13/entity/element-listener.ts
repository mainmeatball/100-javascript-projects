export class ElementListener {
    constructor(private field: HTMLElement,
                private name: string,
                private boundCallback: () => void) {}

    public listen() {
        this.field.addEventListener(this.name, this.boundCallback);
    }

    public removeListener() {
        this.field.removeEventListener(this.name, this.boundCallback);
    }
}
