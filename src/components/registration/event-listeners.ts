import {
    handleAddCompetencia,
    handleCepBlur,
    handleCnpjBlur,
    handleCpfBlur, handleNomeBlur,
    handleSenhaBlur
} from "./input-handlers";


const addEventListenersToRenderedInputs = () => {
    const nomeInput = <HTMLInputElement | null> document.getElementById('nome');
    const cpfInput = <HTMLInputElement | null> document.getElementById('cpf');
    const cnpjInput = <HTMLInputElement | null> document.getElementById('cnpj');
    const cepInput = <HTMLInputElement> document.getElementById('cep');
    const confirmeSenhaInput = <HTMLInputElement> document.getElementById('confirme-senha');
    const senhaInput = <HTMLInputElement> document.getElementById('senha');
    const competenciaBtn = <HTMLButtonElement> document.getElementById('competencia-btn');

    nomeInput && nomeInput.addEventListener('blur', handleNomeBlur);

    cpfInput && cpfInput.addEventListener('blur', handleCpfBlur)

    cnpjInput && cnpjInput.addEventListener('blur', handleCnpjBlur)

    cepInput.addEventListener('blur', handleCepBlur)

    senhaInput.addEventListener('blur', handleSenhaBlur)
    confirmeSenhaInput.addEventListener('blur', handleSenhaBlur)

    competenciaBtn.addEventListener('click', handleAddCompetencia)
}

const removeEventListeners = () => {
    const cpfInput = <HTMLInputElement | null> document.getElementById('cpf');
    const cnpjInput = <HTMLInputElement | null> document.getElementById('cnpj');
    const cepInput = <HTMLInputElement> document.getElementById('cep');
    const confirmeSenhaInput = <HTMLInputElement> document.getElementById('confirme-senha');
    const senhaInput = <HTMLInputElement> document.getElementById('senha');
    const competenciaBtn = <HTMLButtonElement> document.getElementById('competencia-btn');

    cpfInput && cpfInput.removeEventListener('blur', handleCpfBlur)

    cnpjInput && cnpjInput.removeEventListener('blur', handleCnpjBlur)

    cepInput && cepInput.removeEventListener('blur', handleCepBlur)

    senhaInput && senhaInput.removeEventListener('blur', handleSenhaBlur)
    confirmeSenhaInput && confirmeSenhaInput.removeEventListener('blur', handleSenhaBlur)

    competenciaBtn && competenciaBtn.removeEventListener('click', handleAddCompetencia)
}

export {addEventListenersToRenderedInputs, removeEventListeners}