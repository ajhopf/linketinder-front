import {DescricaoInvalidError} from "../../errors/registration-form-errors/descricao-invalid-error";

const validateDescricao = (nome: string, descricao: string) => {
    const pattern = new RegExp(nome, 'i');

    if (descricao.match(pattern)) {
        throw new DescricaoInvalidError('Não é permitido incluir o seu nome na descrição')
    }

}

export {validateDescricao};