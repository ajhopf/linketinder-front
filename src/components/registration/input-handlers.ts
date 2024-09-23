import {searchCep} from "../../utils/form-validations/cep";
import {formatCnpj, formatCpf} from "../../utils/form-validations/cpf";
import Competencia from "../../model/Competencia";
import {userCompetencias} from "./registration-form";
import {validateCandidatoNome, validateEmpresaNome} from "../../utils/form-validations/nome";

interface ValidationErrors {
    nome: boolean,
    cep: boolean,
    cpf: boolean,
    cnpj: boolean,
    senha: boolean
}

const validationErrors: ValidationErrors = {
    nome: true,
    cep: true,
    cpf: true,
    cnpj: true,
    senha: true
}

const handleNomeBlur = async () => {
    const nameInput = <HTMLInputElement> document.getElementById('nome');
    const nomeError = <HTMLElement> document.getElementById('nome-error-message');
    const form = <HTMLFormElement>document.getElementById('registration-form');
    const registrationType = <'empresas' | 'candidatos'> form.getAttribute("data-registration-type");

    try {
        registrationType === 'candidatos' && validateCandidatoNome(nameInput.value);
        registrationType === 'empresas' && validateEmpresaNome(nameInput.value);

        if (!nomeError.hasAttribute('hidden')) {
            nomeError.setAttribute('hidden', 'true');
        }
        validationErrors.nome = false;
    } catch (e: any) {
        nomeError.removeAttribute('hidden');
        nomeError.innerText = e.message;
        validationErrors.nome = true;
    }


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

const handleAddCompetencia = () => {
    const competenciaInput = <HTMLInputElement> document.getElementById('competencia');
    const competenciaExperiencia = <HTMLInputElement> document.getElementById('experiencia-competencia')
    const competenciasList = <HTMLUListElement> document.getElementById('competencias-list');
    const importanciaCompetencia = <HTMLInputElement> document.getElementById('importancia-competencia')

    if (competenciaInput.value.length > 0 && Number(competenciaExperiencia.value) > 0) {
        if (userCompetencias.find(competencia => competencia.competencia === competenciaInput.value)) {
            return;
        }

        const newCompetencia: Competencia = {
            competencia: <string> competenciaInput.value,
            anosExperencia: Number(competenciaExperiencia.value),
            importancia: Number(importanciaCompetencia.value)
        }

        userCompetencias.push(newCompetencia);

        competenciasList.innerHTML += `
            <li id="${competenciaInput.value}" class="list-group-item d-flex justify-content-around" style="cursor: pointer">
                <p class="mb-0">${competenciaInput.value}</p>
                <p class="mb-0">|</p>
                <p class="mb-0">${Number(competenciaExperiencia.value)} anos</p>
                <p class="mb-0">|</p>
                <p class="mb-0">Importância: ${Number(importanciaCompetencia.value)}</p>
            </li>`

        document.getElementById(competenciaInput.value)!.addEventListener('click', handleRemoveCompetencia)

        competenciaInput.value = '';
        competenciaExperiencia.value = '';
    }
}

const handleRemoveCompetencia = (event: Event) => {
    const eventTarget = event.currentTarget as HTMLLIElement;

    if (eventTarget) {
        const liId = eventTarget.id;
        console.log("Clicked LI ID:", liId);
        const idx = userCompetencias.findIndex(competencia => competencia.competencia === liId);
        userCompetencias.splice(idx, 1);
        console.log(userCompetencias)
    }

    eventTarget.removeEventListener('click', handleRemoveCompetencia);
    eventTarget.remove();
}


export {handleNomeBlur, handleSenhaBlur, handleCepBlur, handleCpfBlur, handleCnpjBlur, handleAddCompetencia, validationErrors, ValidationErrors}