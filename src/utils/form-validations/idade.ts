import {IdadeInvalidError} from "../../errors/registration-form-errors/idade-invalid-error";

const validateIdade = (idade: string) => {
    if (Number(idade) < 16 || Number.isNaN(idade)) {
        throw new IdadeInvalidError('A idade mínima para se registrar no Linketinder é 16 anos')
    }
}

export {validateIdade}