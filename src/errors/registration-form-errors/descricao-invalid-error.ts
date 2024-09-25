export class DescricaoInvalidError extends Error {
    constructor(props: string | undefined) {
        super(props);
    }
}