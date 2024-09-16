import {CepInvalidError} from "../errors/cep-invalid-error";

const searchCep = async (cepInput: HTMLInputElement, estado: HTMLInputElement, pais: HTMLInputElement) => {
    const cep = cepInput.value;
    let cepFormatado = cep.replace(/\D/g, '');

    if (cepFormatado != "") {
        let validacep = /^[0-9]{8}$/;

        if(validacep.test(cepFormatado)) {
            estado.value="...";
            pais.value="...";

            const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`)

            if (!response.ok) {
                throw new CepInvalidError(`Response status: ${response.status}`);
            }
            const data = await response.json();

            estado.value = data.estado;
            pais.value = "Brasil"
        }
        else {
            throw new CepInvalidError("Formato de CEP inválido.");
        }
    } else {
        throw new CepInvalidError('Cep inválido')
    }
};

export {searchCep};