import {loginUser, registerUser} from "../../service/user-service";
import {Usuario} from "../../model/Usuario";
import Endereco from "../../model/Endereco";
import Empresa from "../../model/Empresa";
import Candidato from "../../model/Candidato";
import {EmailInUseError} from "../../errors/registration-form-errors/email-in-use-error";
import {addEventListenersToRenderedInputs, removeEventListeners} from "./registration-event-listeners";
import {ValidationErrors, validationErrors} from "./registration-input-handlers";
import {FormInvalidError} from "../../errors/registration-form-errors/form-invalid-error";
import Competencia from "../../model/Competencia";
import {competenciasInputBuilder} from "../shared/competencia-form/competencia-form-builder";

interface Input {
    title: string;
    id: string;
    type: string;
    placeholder?: string;
    error?: string;
    minlength?: string;
    maxlength?: string;
    readonly?: boolean;
}

const defaultInputs: Input[] = [
    { title: 'Nome', id: 'nome', type: 'text', placeholder: "Nome Sobrenome",error: 'Nome deve conter mais de 2 caracteres e conter apenas letras'},
    { title: 'Email', id:'email', type: 'email', placeholder: "email@email.com", error: 'Email já está em uso'},
    { title: 'Senha', id:'senha', type: 'password', minlength: '6'},
    { title: 'Confirme a senha', id:'confirme-senha', type: 'password',  error: 'As senhas devem ser iguais!'},
    { title: 'Descrição', id: 'descricao', type: 'text', placeholder: "Preencha seu nome primeiro", readonly: true},
    {
        title: 'Cep',
        id: 'cep',
        type: 'text',
        maxlength: '9',
        placeholder: "99999-999",
        error: 'Cep inválido'
    },
    { title: 'Estado', id: 'estado', type: 'text', readonly: true },
    { title: 'Pais', id: 'pais', type: 'text', readonly: true },
];

const candidatoInputs: Input[] = [
    {title: 'Cpf', id: 'cpf', type: 'text', placeholder: "123.456.789-00", minlength: '11', maxlength: '14', error: 'Cpf inválido'},
    {title: 'Idade', id: 'idade', type: 'number'},
    {title: 'Telefone', id: 'telefone', placeholder: "(99) 99999-9999", type: 'text'},
    {title: 'Linkedin', id: 'linkedin', placeholder: "linkedin.com/in/seu-perfil",type: 'text'},
]

const empresaInputs: Input[] = [
    {title: 'Cnpj', id: 'cnpj', type: 'text', placeholder: "12.345.678/9123-45", minlength: '14', maxlength: '18', error: 'Cnpj inválido'},
]

const userCompetencias: Competencia[] = [];

const form = <HTMLFormElement> document.getElementById('registration-form')!;
const toggleUserTypeCheckbox = <HTMLInputElement> document.getElementById("toggle-user-type-checkbox");
const toggleUserTypeLabel = <HTMLInputElement> document.getElementById("toggle-user-type-label");
const pageTitle = <HTMLTitleElement> document.getElementById("page-title");

const toggleForm = () => {
    const isEmpresa = toggleUserTypeCheckbox.checked;
    let text;
    userCompetencias.splice(0);

    if (isEmpresa) {
        text = 'Registro de Empresa';
        pageTitle.innerHTML = 'Criar Conta Empresarial'
        form.setAttribute('data-registration-type', 'empresas')
    } else {
        text = 'Registro de Candidato';
        pageTitle.innerHTML = 'Criar Conta de Candidato'
        form.setAttribute('data-registration-type', 'candidatos')
    }

    toggleUserTypeLabel.textContent = text;
    buildRegistrationForm();
}

const textInputBuilder = (input: Input): string => {
    return `
    <div class="form-section mb-3 ${input.id === 'cnpj' ? 'col-10' : 'col-5'}">
        <label for=${input.id} class="form-label">${input.title}</label>
        <input 
            type=${input.type} 
            id=${input.id} 
            name=${input.id} 
            class="form-control" 
            required
            ${input.placeholder && 'placeholder="'+input.placeholder+'"'}
            ${input.maxlength && 'maxlength='+input.maxlength }
            ${input.minlength && 'minlength='+input.minlength }
            ${input.readonly && 'disabled'}
        >
        <div class="d-flex justify-content-center my-3">
           <small hidden id="${input.id}-error-message" class="text-danger text-center">${input.error}</small>
        </div>
    </div>
   `
};

const buildRegistrationForm = () => {
    const inputContainer = <HTMLDivElement> document.getElementById("inputs-container");
    const registrationType = <'empresas' | 'candidatos'> form.getAttribute("data-registration-type");

    removeEventListeners()

    inputContainer.innerHTML = '';

    defaultInputs.forEach((input) => {
        inputContainer.innerHTML += textInputBuilder(input)
    })

    if (registrationType === 'candidatos') {
        candidatoInputs.forEach((input) => {
            inputContainer.innerHTML += textInputBuilder(input)
        })
    } else {
        empresaInputs.forEach((input) => {
            inputContainer.innerHTML += textInputBuilder(input)
        })
    }

    inputContainer.innerHTML += competenciasInputBuilder(registrationType);

    addEventListenersToRenderedInputs();
}

const checkFormErrors = (registrationType: 'empresas' | 'candidatos') => {
    let key: keyof ValidationErrors

    for (key in validationErrors) {
        if (validationErrors[key]) {
            if (registrationType === 'empresas' && ['cpf', 'linkedin', 'telefone', 'idade'].includes(key)) {
                break;
            } else if (registrationType === 'candidatos' && key === 'cnpj') {
                break;
            } else {
                throw new FormInvalidError(`Formulário inválido. Campo: ${key}`)
            }
        }
    }

    if (userCompetencias.length === 0) {
        throw new FormInvalidError('Adicione ao menos uma competência')
    }
}

const submitRegistration = (event: SubmitEvent) => {
    event.preventDefault();

    try {
        const registrationType = <'empresas' | 'candidatos'> form.getAttribute('data-registration-type');

        checkFormErrors(registrationType);

        const data = new FormData(form);

        const usuario: Usuario = {
            id: 0,
            nome: (<string> data.get('nome')).trim(),
            senha: (<string> data.get('senha')).trim(),
            competencias: userCompetencias,
            descricao: (<string> data.get('descricao')).trim(),
            email: (<string> data.get('email')).trim(),
            endereco: <Endereco> {
                cep: <string> data.get('cep'),
                estado: <string> data.get('estado'),
                pais: <string> data.get('pais')
            }
        }

        if (registrationType === 'empresas') {
            const empresa: Empresa = {
                ...usuario,
                cnpj: <string> data.get('cnpj')
            }

            registerUser(empresa, "empresa");
        } else {
            const candidato: Candidato = {
                ...usuario,
                cpf: <string> data.get('cpf'),
                idade: Number(data.get('idade')),
                telefone: <string> data.get('telefone'),
                linkedin: <string> data.get('linkedin')
            }

            registerUser(candidato, "candidato");
        }

        loginUser(usuario.email, usuario.senha, registrationType);
        window.location.assign('/dashboard.html');

    } catch (e) {
        if (e instanceof EmailInUseError) {
            const emailError = <HTMLElement> document.getElementById('email-error-message');
            const formError = <HTMLElement> document.getElementById('form-error-message');
            emailError.removeAttribute('hidden')
            formError.innerText = 'Email já está em uso';
        }

        if (e instanceof FormInvalidError) {
            const formError = <HTMLElement> document.getElementById('form-error-message');
            formError.innerText = e.message;
            formError.removeAttribute('hidden')
        }
    }
}

const addRegistrationFormEventListeners = () => {
    toggleUserTypeCheckbox.addEventListener('change', toggleForm);
    form.addEventListener('submit', submitRegistration);
}

export { buildRegistrationForm, addRegistrationFormEventListeners, userCompetencias }
