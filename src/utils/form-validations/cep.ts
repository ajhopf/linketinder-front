import {CepInvalidError} from "../../errors/cep-invalid-error";

const validaCep = (cep: string) => {
    let cepFormatado = cep.replace(/\D/g, '');

    const validacep = /^[0-9]{8}$/;

    if (!validacep.test(cepFormatado)) {
        throw new CepInvalidError("Formato de CEP inválido.");
    } else {
        return cepFormatado;
    }
}



export {validaCep};