import {loginUser, registerUser} from "../../database/local-storage";
import Usuario from "../../model/Usuario";
import Endereco from "../../model/Endereco";
import Empresa from "../../model/Empresa";
import Candidato from "../../model/Candidato";
import {EmailInUseError} from "../../errors/email-in-use-error";
import {searchCep} from "../../utils/cep";

interface Input {
    title: string;
    id: string;
    type: string;
    error?: string;
    maxlength?: string;
    readonly?: boolean;
}

const defaultInputs: Input[] = [
    { title: 'Nome', id: 'nome', type: 'text'},
    { title: 'Email', id:'email', type: 'text', error: 'Email já está em uso'},
    { title: 'Senha', id:'senha', type: 'text'},
    { title: 'Descrição', id: 'descricao', type: 'text'},
    {
        title: 'Cep',
        id: 'cep',
        type: 'text',
        maxlength: '9',
        error: 'Cep inválido'
    },
    { title: 'Estado', id: 'estado', type: 'text', readonly: true },
    { title: 'Pais', id: 'pais', type: 'text', readonly: true },
];

const candidatoInputs: Input[] = [
    {title: 'Cpf', id: 'cpf', type: 'text'},
    {title: 'Idade', id: 'idade', type: 'text'}
]

const empresaInputs: Input[] = [
    {title: 'Cnpj', id: 'cnpj', type: 'text'},
]

const form = <HTMLFormElement> document.getElementById('registration-form')!;
const toggleUserTypeCheckbox = <HTMLInputElement> document.getElementById("toggle-user-type-checkbox");
const toggleUserTypeLabel = <HTMLInputElement> document.getElementById("toggle-user-type-label");
const pageTitle = <HTMLTitleElement> document.getElementById("page-title");

const toggleForm = () => {
    const isEmpresa = toggleUserTypeCheckbox.checked;
    let text;

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
    <div class="form-section mb-3">
        <label for=${input.id} class="form-label">${input.title}</label>
        <input 
        type=${input.type} 
        id=${input.id} 
        name=${input.id} 
        class="form-control" 
        ${input.maxlength && 'maxlength='+input.maxlength }
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
    const registrationType = form.getAttribute("data-registration-type")

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
}

const submitRegistration = (event: SubmitEvent) => {
    event.preventDefault();

    const data = new FormData(form);

    const usuario: Usuario = {
        id: 0,
        nome: <string> data.get('nome'),
        senha: <string> data.get('senha'),
        competencias: [],
        descricao: <string> data.get('descricao'),
        email: <string> data.get('email'),
        endereco: <Endereco> {
            cep: <string> data.get('cep'),
            estado: <string> data.get('estado'),
            pais: <string> data.get('pais')
        }
    }

    try {
        const registrationType = <'empresas' | 'candidatos'> form.getAttribute('data-registration-type')

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
                idade: Number(data.get('idade'))
            }

            registerUser(candidato, "candidato");
        }

        loginUser(usuario.email, usuario.senha, registrationType)

    } catch (e) {
        if (e instanceof EmailInUseError) {
            const emailError = <HTMLElement> document.getElementById('email-error-message');
            emailError.removeAttribute('hidden')
        }
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
    } catch (e) {
        cepError.removeAttribute('hidden')
    }
}


const addRegistrationFormEventListeners = () => {
    toggleUserTypeCheckbox.addEventListener('change', toggleForm);
    form.addEventListener('submit', submitRegistration);
    const cepInput = <HTMLInputElement> document.getElementById('cep');
    cepInput.addEventListener('blur', handleCepBlur)
}

export { buildRegistrationForm, addRegistrationFormEventListeners }
