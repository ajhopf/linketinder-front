import {NomeInvalidError} from "../../errors/registration-form-errors/nome-invalid-error";

const validateCandidatoNome = (nome: string) => {
    // Has at least one surname -> one blank space in the middle of the word required
    // Only letters
    // First name has more than 2 words

    const pattern = /^[A-zÀ-ü]{2,}\s[A-zÀ-ü]+(\s[A-zÀ-ü]+)?$/

    if (!pattern.test(nome)) {
        throw new NomeInvalidError('O nome deve incluir ao menos um sobrenome\n O primeiro nome deve ter mais de 2 letras\n Deve conter apenas letras')
    }
}

const validateEmpresaNome = (nome: string) => {
    const pattern = /^\w{2,}$/

    if (!pattern.test(nome)) {
        throw new NomeInvalidError('O nome deve conter ao menos 2 caracteres.')
    }
}

export {validateCandidatoNome, validateEmpresaNome};