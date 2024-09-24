
import {validateAndFormatCnpj, validateAndFormatCpf} from "../../utils/form-validations/cpf-cnpj";
import Competencia from "../../model/Competencia";
import {userCompetencias} from "./registration-form";
import {validateCandidatoNome, validateEmpresaNome} from "../../utils/form-validations/nome";
import {validateEmail} from "../../utils/form-validations/email";
import {searchCep} from "../../utils/via-cep";
import {validateSenha} from "../../utils/form-validations/senha";
import {validateAndFormatTelefone} from "../../utils/form-validations/telefone";
import {validateLinkedin} from "../../utils/form-validations/linkedin";
import {validateAndFormatCep} from "../../utils/form-validations/cep";

interface ValidationErrors {
    nome: boolean,
    email: boolean,
    cep: boolean,
    cpf: boolean,
    cnpj: boolean,
    senha: boolean,
    telefone: boolean,
    linkedin: boolean
}

const validationErrors: ValidationErrors = {
    nome: true,
    email: true,
    cep: true,
    cpf: true,
    cnpj: true,
    senha: true,
    telefone: true,
    linkedin: true
}

type GenericHandlerIdentifier = 'nome' | 'email' | 'cep' | 'cpf' | 'cnpj' | 'senha' | 'telefone' | 'linkedin'

const genericHandler = (identifier: GenericHandlerIdentifier, validationFn: (param: string) => void | string) => {
    const input = <HTMLInputElement> document.getElementById(identifier);
    const inputError = <HTMLElement> document.getElementById(`${identifier}-error-message`);

    try {
        const fnReturn = validationFn(input.value);

        if (!inputError.hasAttribute('hidden')) {
            inputError.setAttribute('hidden', 'true');
        }

        validationErrors[identifier] = false;

        if (fnReturn) {
            input.value = fnReturn;
            return fnReturn;
        }
    } catch (e: any) {
        inputError.removeAttribute('hidden');
        inputError.innerText = e.message;
        validationErrors[identifier] = true;
    }
}

const handleNomeBlur = () => {
    const form = <HTMLFormElement>document.getElementById('registration-form');
    const registrationType = <'empresas' | 'candidatos'> form.getAttribute("data-registration-type");

    registrationType === 'candidatos' && genericHandler('nome', validateCandidatoNome)
    registrationType === 'empresas' && genericHandler('nome', validateEmpresaNome)
}

const handleEmailBlur = () => {
    genericHandler('email', validateEmail);
}

const handleCpfBlur = () => {
    genericHandler('cpf', validateAndFormatCpf);
}


const handleCnpjBlur = () => {
    genericHandler('cnpj', validateAndFormatCnpj);
}

const handleLinkedinBlur = () => {
    genericHandler('linkedin', validateLinkedin);
}

const handleTelefoneBlur = () => {
    genericHandler('telefone', validateAndFormatTelefone);
}

const handleCepBlur = async () => {
    const estadoInput = <HTMLInputElement> document.getElementById('estado');
    const paisInput = <HTMLInputElement> document.getElementById('pais');
    const cepError = <HTMLElement> document.getElementById('cep-error-message');

    const formattedCep = genericHandler('cep', validateAndFormatCep);

    if (formattedCep) {
       try {
           estadoInput.value="...";
           paisInput.value="...";

           const address = await searchCep(formattedCep);

           estadoInput.value = address.estado;
           paisInput.value = "Brasil"
       } catch (e: any) {
           cepError.removeAttribute('hidden')
           cepError.innerText = e.message;
           validationErrors.cep = true;
       }

    }
}

const handleSenhaBlur = () => {
    const senha = <HTMLInputElement> document.getElementById('senha');
    const confirmeSenhaInput = <HTMLInputElement> document.getElementById('confirme-senha');
    const confirmeSenhaError = <HTMLInputElement> document.getElementById('confirme-senha-error-message');

    genericHandler('senha', validateSenha);

    if (senha.value === confirmeSenhaInput.value) {
        if (!confirmeSenhaError.hasAttribute('hidden')) {
            confirmeSenhaError.setAttribute('hidden', 'true');
        }
        validationErrors.senha = false;
    } else {
        if (confirmeSenhaInput.value.length > 0) {
            confirmeSenhaError.removeAttribute('hidden')
            confirmeSenhaError.innerText = 'A senha de confirmação deve ser igual a senha definida';
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

        const idx = userCompetencias.findIndex(competencia => competencia.competencia === liId);
        userCompetencias.splice(idx, 1);
    }

    eventTarget.removeEventListener('click', handleRemoveCompetencia);
    eventTarget.remove();
}


export {handleNomeBlur, handleEmailBlur, handleSenhaBlur, handleLinkedinBlur, handleTelefoneBlur, handleCepBlur, handleCpfBlur, handleCnpjBlur, handleAddCompetencia, validationErrors, ValidationErrors}