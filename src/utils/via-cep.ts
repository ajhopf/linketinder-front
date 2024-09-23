import {CepInvalidError} from "../errors/cep-invalid-error";
import {validaCep} from "./form-validations/cep";

const searchCep = async (cepInput: HTMLInputElement, estado: HTMLInputElement, pais: HTMLInputElement) => {
    const cep = cepInput.value;

    try {
        const cepFormatado = validaCep(cep);

        estado.value="...";
        pais.value="...";

        const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`)

        if (!response.ok) {
            throw new CepInvalidError(`Response status: ${response.status}`);
        }
        const data = await response.json();

        estado.value = data.estado;
        pais.value = "Brasil"
    } catch(e) {
        throw e;
    }

};

export {searchCep}