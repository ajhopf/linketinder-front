import {validateAndFormatCnpj, validateAndFormatCpf} from "../../utils/form-validations/cpf-cnpj";
import {userCompetencias} from "./registration-form";
import {validateCandidatoNome, validateEmpresaNome} from "../../utils/form-validations/nome";
import {validateEmail} from "../../utils/form-validations/email";
import {searchCep} from "../../utils/via-cep";
import {validateSenha} from "../../utils/form-validations/senha";
import {validateAndFormatTelefone} from "../../utils/form-validations/telefone";
import {validateLinkedin} from "../../utils/form-validations/linkedin";
import {validateAndFormatCep} from "../../utils/form-validations/cep";
import {validateDescricao} from "../../utils/form-validations/descricao";
import {validateIdade} from "../../utils/form-validations/idade";
import {genericHandleAddCompetencia} from "../shared/competencia-handlers";

interface ValidationErrors {
    nome: boolean,
    email: boolean,
    cep: boolean,
    cpf: boolean,
    cnpj: boolean,
    idade: boolean,
    senha: boolean,
    telefone: boolean,
    linkedin: boolean,
    descricao: boolean
}

const validationErrors: ValidationErrors = {
    nome: true,
    email: true,
    cep: true,
    cpf: true,
    cnpj: true,
    idade: true,
    senha: true,
    telefone: true,
    linkedin: true,
    descricao: true
}

type GenericHandlerIdentifier = 'nome' | 'email' | 'cep' | 'cpf' | 'cnpj' | 'idade' | 'senha' | 'telefone' | 'linkedin' | 'descricao'

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
    const descricaoInput = <HTMLInputElement> document.getElementById('descricao');

    registrationType === 'candidatos' && genericHandler('nome', validateCandidatoNome)
    registrationType === 'empresas' && genericHandler('nome', validateEmpresaNome)

    if (!validationErrors.nome) {
        descricaoInput.removeAttribute('disabled');
        descricaoInput.setAttribute('placeholder', 'Digite sua descrição. Ela não deve conter o seu nome.')
    } else {
        descricaoInput.setAttribute('disabled', 'true')
        descricaoInput.setAttribute('placeholder', 'Preencha seu nome primeiro')
    }
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

const handleIdadeBlur = () => {
    genericHandler('idade', validateIdade)
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

const handleDescricaoBlur = () => {
    const nomeInput = <HTMLInputElement> document.getElementById("nome");
    const descricaoInput = <HTMLInputElement> document.getElementById('descricao');
    const descricaoError = <HTMLElement> document.getElementById('descricao-error-message')

    try {
        validateDescricao(nomeInput.value, descricaoInput.value);

        if (!descricaoError.hasAttribute('hidden')) {
            descricaoError.setAttribute('hidden', 'true');
        }

        validationErrors.descricao = false;

    } catch (e: any) {
        descricaoError.removeAttribute('hidden');
        descricaoError.innerText = e.message;
        validationErrors.descricao = true;
    }
}


const handleAddCompetencia = () => {
    genericHandleAddCompetencia(userCompetencias);
}

export {
    handleNomeBlur,
    handleEmailBlur,
    handleSenhaBlur,
    handleDescricaoBlur,
    handleLinkedinBlur,
    handleTelefoneBlur,
    handleCepBlur,
    handleCpfBlur,
    handleCnpjBlur,
    handleIdadeBlur,
    handleAddCompetencia,
    validationErrors,
    ValidationErrors
}