export class NomeInvalidError extends Error {
    constructor(props: string | undefined) {
        super(props);
    }
}