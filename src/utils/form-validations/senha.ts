import {SenhaInvalidError} from "../../errors/senha-invalid-error";

const validateSenha = (senha: string) => {
    const moreThanEight = /.{8,}/.test(senha);
    const hasUpperCase = /[A-Z]+/.test(senha);
    const hasLowerCase = /[a-z]+/.test(senha);
    const hasSpecialCharacter = /[@_$%&#+=!]+/.test(senha);

    if (!moreThanEight) {
        throw new SenhaInvalidError('Senha necessita de 8 ou mais caracteres')
    }

    if (!hasLowerCase || !hasUpperCase) {
        throw new SenhaInvalidError('Senha necessita ao menos um caracter maiúsculo e um minúsculo')
    }

    if (!hasSpecialCharacter) {
        throw new SenhaInvalidError('Senha deve conter ao menos um caractere especial: @_$%&#+=!')
    }
};

export {validateSenha};