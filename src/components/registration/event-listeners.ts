import {
    handleAddCompetencia,
    handleCepBlur,
    handleCnpjBlur,
    handleCpfBlur, handleDescricaoBlur, handleEmailBlur, handleIdadeBlur, handleLinkedinBlur, handleNomeBlur,
    handleSenhaBlur, handleTelefoneBlur
} from "./input-handlers";

const getInputs = () => {
    const nomeInput = <HTMLInputElement> document.getElementById('nome');
    const descricaoInput = <HTMLInputElement> document.getElementById('descricao');
    const emailInput = <HTMLInputElement> document.getElementById('email');
    const cpfInput = <HTMLInputElement | null> document.getElementById('cpf');
    const cnpjInput = <HTMLInputElement | null> document.getElementById('cnpj');
    const idadeInput = <HTMLInputElement | null> document.getElementById('idade');
    const cepInput = <HTMLInputElement> document.getElementById('cep');
    const telefoneInput = <HTMLInputElement | null> document.getElementById('telefone')
    const linkedinInput = <HTMLInputElement | null> document.getElementById('linkedin')
    const confirmeSenhaInput = <HTMLInputElement> document.getElementById('confirme-senha');
    const senhaInput = <HTMLInputElement> document.getElementById('senha');
    const competenciaBtn = <HTMLButtonElement> document.getElementById('competencia-btn');

    return { nomeInput, descricaoInput, emailInput, cpfInput, cnpjInput, idadeInput, cepInput, telefoneInput, linkedinInput, confirmeSenhaInput, senhaInput, competenciaBtn }
}

const addEventListenersToRenderedInputs = () => {
    const {nomeInput, descricaoInput, emailInput, cpfInput, cnpjInput, idadeInput, cepInput, telefoneInput, linkedinInput, confirmeSenhaInput, senhaInput, competenciaBtn } = getInputs();

    nomeInput && nomeInput.addEventListener('blur', handleNomeBlur);

    descricaoInput && descricaoInput.addEventListener('blur', handleDescricaoBlur);

    emailInput && emailInput.addEventListener('blur', handleEmailBlur);

    cpfInput && cpfInput?.addEventListener('blur', handleCpfBlur);

    cnpjInput && cnpjInput.addEventListener('blur', handleCnpjBlur);

    idadeInput && idadeInput.addEventListener('blur', handleIdadeBlur);

    cepInput.addEventListener('blur', handleCepBlur);

    telefoneInput && telefoneInput.addEventListener('blur', handleTelefoneBlur);

    linkedinInput && linkedinInput.addEventListener('blur', handleLinkedinBlur);

    senhaInput.addEventListener('blur', handleSenhaBlur);
    confirmeSenhaInput.addEventListener('blur', handleSenhaBlur);

    competenciaBtn.addEventListener('click', handleAddCompetencia);
}

const removeEventListeners = () => {
    const {nomeInput, descricaoInput, emailInput, cpfInput, cnpjInput, idadeInput, cepInput, telefoneInput, linkedinInput, confirmeSenhaInput, senhaInput, competenciaBtn } = getInputs();

    nomeInput && nomeInput.removeEventListener('blur', handleNomeBlur);

    descricaoInput && descricaoInput.removeEventListener('blur', handleDescricaoBlur);

    emailInput && emailInput.removeEventListener('blur', handleEmailBlur);

    cpfInput && cpfInput.removeEventListener('blur', handleCpfBlur);

    cnpjInput && cnpjInput.removeEventListener('blur', handleCnpjBlur);

    idadeInput && idadeInput.removeEventListener('blur', handleIdadeBlur);

    cepInput && cepInput.removeEventListener('blur', handleCepBlur);

    telefoneInput && telefoneInput.removeEventListener('blur', handleTelefoneBlur);

    linkedinInput && linkedinInput.removeEventListener('blur', handleLinkedinBlur);

    senhaInput && senhaInput.removeEventListener('blur', handleSenhaBlur);
    confirmeSenhaInput && confirmeSenhaInput.removeEventListener('blur', handleSenhaBlur);

    competenciaBtn && competenciaBtn.removeEventListener('click', handleAddCompetencia);
}

export {addEventListenersToRenderedInputs, removeEventListeners}