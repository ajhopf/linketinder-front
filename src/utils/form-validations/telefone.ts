import {TelefoneInvalidError} from "../../errors/registration-form-errors/telefone-invalid-error";

const validateAndFormatTelefone = (telefone: string) => {
    const onlyNumbersTelefone = telefone.replace(/\D/g, '')

    const telefonesRegex = /\(?\d{2}\)?\s?\d{5}-?\d{4}/g

    if (!telefonesRegex.test(telefone)) {
        throw new TelefoneInvalidError('Informe o telefone com DDD no formato: (DD) 99999-9999 ou DD 99999-9999')
    }
    return onlyNumbersTelefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
};

export {validateAndFormatTelefone};