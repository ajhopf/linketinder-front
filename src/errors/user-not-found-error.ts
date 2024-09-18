export class UserNotFoundError extends Error {
    constructor(props: string | undefined) {
        super(props);
    }
}