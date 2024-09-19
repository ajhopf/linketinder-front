export class VagaNotFoundError extends Error {
    constructor(props: string | undefined) {
        super(props);
    }
}