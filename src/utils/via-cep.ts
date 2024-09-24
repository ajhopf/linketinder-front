import {CepInvalidError} from "../errors/registration-form-errors/cep-invalid-error";

const searchCep = async (cep: string) => {

    const onlyNumbersCep = cep.replace(/\D/, '');

    const response = await fetch(`https://viacep.com.br/ws/${onlyNumbersCep}/json/`)

    if (!response.ok) {
        throw new CepInvalidError(`Não foi possível obter informações do cep: status ${response.status}`);
    }

    return await response.json();
};

export {searchCep}