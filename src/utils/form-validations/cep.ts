import {CepInvalidError} from "../../errors/registration-form-errors/cep-invalid-error";

const validateAndFormatCep = (cep: string) => {
    let cepFormatado = cep.replace(/\D/g, '');

    const validacep = /^[0-9]{8}$/;

    if (!validacep.test(cepFormatado)) {
        throw new CepInvalidError("CEP inválido.");
    } else {
        return cepFormatado.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
}



export {validateAndFormatCep};