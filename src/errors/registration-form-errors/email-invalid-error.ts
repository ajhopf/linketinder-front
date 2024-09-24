export class EmailInvalidError extends Error {
    constructor(props: string | undefined) {
        super(props);
    }
}