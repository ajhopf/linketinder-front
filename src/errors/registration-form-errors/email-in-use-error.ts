export class EmailInUseError extends Error {
    constructor(props: string | undefined) {
        super(props);
    }
}