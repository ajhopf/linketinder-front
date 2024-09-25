import {DescricaoInvalidError} from "../../errors/registration-form-errors/descricao-invalid-error";

const validateDescricaoAndTitulo = (nomeDoLoggedUser: string, descricaoOuTitulo: string) => {
    const pattern = new RegExp(nomeDoLoggedUser, 'i');

    if (descricaoOuTitulo.match(pattern)) {
        throw new DescricaoInvalidError('Não é permitido incluir o seu nome neste campo')
    }

    if (descricaoOuTitulo.trim().length < 5){
        throw new DescricaoInvalidError('Este campo deve incluir pelo menos 5 caracteres')
    }

}

export {validateDescricaoAndTitulo};