import {EmailInvalidError} from "../../errors/email-invalid-error";

const validateEmail = (email: string) => {
    const pattern = /^[\w._%+-]+@\w+\.\w{2,}(\.\w{2,})?$/

    if (!pattern.test(email)) {
        throw new EmailInvalidError('Informe um email válido')
    }
}

export { validateEmail }