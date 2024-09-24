export class SenhaInvalidError extends Error {
    constructor(props: string | undefined) {
        super(props);
    }
}