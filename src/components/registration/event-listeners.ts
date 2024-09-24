import {
    handleAddCompetencia,
    handleCepBlur,
    handleCnpjBlur,
    handleCpfBlur, handleEmailBlur, handleLinkedinBlur, handleNomeBlur,
    handleSenhaBlur, handleTelefoneBlur
} from "./input-handlers";

const getInputs = () => {
    const nomeInput = <HTMLInputElement> document.getElementById('nome');
    const emailInput = <HTMLInputElement> document.getElementById('email');
    const cpfInput = <HTMLInputElement | null> document.getElementById('cpf');
    const cnpjInput = <HTMLInputElement | null> document.getElementById('cnpj');
    const cepInput = <HTMLInputElement> document.getElementById('cep');
    const telefoneInput = <HTMLInputElement | null> document.getElementById('telefone')
    const linkedinInput = <HTMLInputElement | null> document.getElementById('linkedin')
    const confirmeSenhaInput = <HTMLInputElement> document.getElementById('confirme-senha');
    const senhaInput = <HTMLInputElement> document.getElementById('senha');
    const competenciaBtn = <HTMLButtonElement> document.getElementById('competencia-btn');

    return { nomeInput, emailInput, cpfInput, cnpjInput, cepInput, telefoneInput, linkedinInput, confirmeSenhaInput, senhaInput, competenciaBtn }
}

const addEventListenersToRenderedInputs = () => {
    const {nomeInput, emailInput, cpfInput, cnpjInput, cepInput, telefoneInput, linkedinInput, confirmeSenhaInput, senhaInput, competenciaBtn } = getInputs();

    nomeInput && nomeInput.addEventListener('blur', handleNomeBlur);

    emailInput && emailInput.addEventListener('blur', handleEmailBlur);

    cpfInput && cpfInput?.addEventListener('blur', handleCpfBlur);

    cnpjInput && cnpjInput.addEventListener('blur', handleCnpjBlur);

    cepInput.addEventListener('blur', handleCepBlur);

    telefoneInput && telefoneInput.addEventListener('blur', handleTelefoneBlur);

    linkedinInput && linkedinInput.addEventListener('blur', handleLinkedinBlur);

    senhaInput.addEventListener('blur', handleSenhaBlur);
    confirmeSenhaInput.addEventListener('blur', handleSenhaBlur);

    competenciaBtn.addEventListener('click', handleAddCompetencia);
}

const removeEventListeners = () => {
    const {nomeInput, emailInput, cpfInput, cnpjInput, cepInput, telefoneInput, linkedinInput, confirmeSenhaInput, senhaInput, competenciaBtn } = getInputs();

    nomeInput && nomeInput.removeEventListener('blur', handleNomeBlur);

    emailInput && emailInput.removeEventListener('blur', handleEmailBlur);

    cpfInput && cpfInput.removeEventListener('blur', handleCpfBlur);

    cnpjInput && cnpjInput.removeEventListener('blur', handleCnpjBlur);

    cepInput && cepInput.removeEventListener('blur', handleCepBlur);

    telefoneInput && telefoneInput.removeEventListener('blur', handleTelefoneBlur);

    linkedinInput && linkedinInput.removeEventListener('blur', handleLinkedinBlur);

    senhaInput && senhaInput.removeEventListener('blur', handleSenhaBlur);
    confirmeSenhaInput && confirmeSenhaInput.removeEventListener('blur', handleSenhaBlur);

    competenciaBtn && competenciaBtn.removeEventListener('click', handleAddCompetencia);
}

export {addEventListenersToRenderedInputs, removeEventListeners}