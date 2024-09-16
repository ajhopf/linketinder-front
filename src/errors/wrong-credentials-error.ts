export class WrongCredentialsError extends Error {
    constructor(props: string | undefined) {
        super(props);
    }
}