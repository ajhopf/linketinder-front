export class CpfCnpjError extends Error {
    constructor(props: string | undefined) {
        super(props);
    }
}