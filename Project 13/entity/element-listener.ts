export class ElementListener {
    public constructor(private field: HTMLElement,
                       private name: string,
                       private boundCallback: () => void) {}

    public listen(): void {
        this.field.addEventListener(this.name, this.boundCallback);
    }

    public removeListener(): void {
        this.field.removeEventListener(this.name, this.boundCallback);
    }
}
