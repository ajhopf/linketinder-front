import {searchCep} from "../../utils/cep";
import {formatCnpj, formatCpf} from "../../utils/cpf";

interface ValidationErrors {
    cep: boolean,
    cpf: boolean,
    cnpj: boolean,
    senha: boolean
}

const validationErrors: ValidationErrors = {
    cep: true,
    cpf: true,
    cnpj: true,
    senha: true
}

const handleCepBlur = async () => {
    const cepInput = <HTMLInputElement> document.getElementById('cep');
    const estadoInput = <HTMLInputElement> document.getElementById('estado');
    const paisInput = <HTMLInputElement> document.getElementById('pais');
    const cepError = <HTMLElement> document.getElementById('cep-error-message');

    try {
        await searchCep(cepInput, estadoInput, paisInput)
        if (!cepError.hasAttribute('hidden')) {
            cepError.setAttribute('hidden', 'true');
        }
        validationErrors.cep = false;
    } catch (e) {
        cepError.removeAttribute('hidden')
        validationErrors.cep = true;
    }
}

const handleCpfBlur = () => {
    const cpfInput = <HTMLInputElement> document.getElementById('cpf');
    const cpfError = <HTMLElement> document.getElementById('cpf-error-message');

    try {
        cpfInput.value = formatCpf(cpfInput.value)
        if (!cpfError.hasAttribute('hidden')) {
            cpfError.setAttribute('hidden', 'true');
        }
        validationErrors.cpf = false;
    } catch (e) {
        cpfError.removeAttribute('hidden')
        validationErrors.cpf = true;
    }
}


const handleCnpjBlur = () => {
    const cnpjInput = <HTMLInputElement> document.getElementById('cnpj');
    const cnpjError = <HTMLElement> document.getElementById('cnpj-error-message');

    try {
        cnpjInput.value = formatCnpj(cnpjInput.value)
        if (!cnpjError.hasAttribute('hidden')) {
            cnpjError.setAttribute('hidden', 'true');
        }
        validationErrors.cnpj = false;
    } catch (e) {
        cnpjError.removeAttribute('hidden')
        validationErrors.cnpj = true;
    }
}

const handleSenhaBlur = () => {
    const senha = <HTMLInputElement> document.getElementById('senha');
    const confirmeSenhaInput = <HTMLInputElement> document.getElementById('confirme-senha');
    const confirmeSenhaError = <HTMLInputElement> document.getElementById('confirme-senha-error-message');

    if (senha.value.length > 0 && confirmeSenhaInput.value.length > 0 && senha.value !== confirmeSenhaInput.value) {
        confirmeSenhaError.removeAttribute('hidden')
        validationErrors.senha = false;
    } else {
        if (!confirmeSenhaError.hasAttribute('hidden')) {
            confirmeSenhaError.setAttribute('hidden', 'true');
        }
        validationErrors.senha = true;
    }
}

export {handleSenhaBlur, handleCepBlur, handleCpfBlur, handleCnpjBlur, validationErrors, ValidationErrors}