import {handleCepBlur, handleCnpjBlur, handleCpfBlur, handleSenhaBlur} from "./registration-form-input-handlers";

const addEventListenersToRenderedInputs = () => {
    const cpfInput = <HTMLInputElement | null> document.getElementById('cpf');
    cpfInput && cpfInput.addEventListener('blur', handleCpfBlur)

    const cnpjInput = <HTMLInputElement | null> document.getElementById('cnpj');
    cnpjInput && cnpjInput.addEventListener('blur', handleCnpjBlur)

    const cepInput = <HTMLInputElement> document.getElementById('cep');
    cepInput.addEventListener('blur', handleCepBlur)

    const confirmeSenhaInput = <HTMLInputElement> document.getElementById('confirme-senha');
    const senhaInput = <HTMLInputElement> document.getElementById('senha');
    senhaInput.addEventListener('blur', handleSenhaBlur)
    confirmeSenhaInput.addEventListener('blur', handleSenhaBlur)
}

const removeEventListeners = () => {
    const cpfInput = <HTMLInputElement | null> document.getElementById('cpf');
    cpfInput && cpfInput.removeEventListener('blur', handleCpfBlur)

    const cnpjInput = <HTMLInputElement | null> document.getElementById('cnpj');
    cnpjInput && cnpjInput.removeEventListener('blur', handleCnpjBlur)

    const cepInput = <HTMLInputElement | null> document.getElementById('cep');
    cepInput && cepInput.removeEventListener('blur', handleCepBlur)

    const confirmeSenhaInput = <HTMLInputElement | null> document.getElementById('confirme-senha');
    const senhaInput = <HTMLInputElement | null> document.getElementById('senha');
    senhaInput && senhaInput.removeEventListener('blur', handleSenhaBlur)
    confirmeSenhaInput && confirmeSenhaInput.removeEventListener('blur', handleSenhaBlur)
}

export {addEventListenersToRenderedInputs, removeEventListeners}