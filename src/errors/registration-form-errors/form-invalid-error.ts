export class FormInvalidError extends Error {
    constructor(props: string | undefined) {
        super(props);
    }
}