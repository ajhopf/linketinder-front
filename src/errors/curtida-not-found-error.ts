export class CurtidaNotFoundError extends Error {
    constructor(props: string | undefined) {
        super(props);
    }
}