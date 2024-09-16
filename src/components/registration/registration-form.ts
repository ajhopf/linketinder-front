import {registerUser} from "../../database/local-storage";
import Usuario from "../../model/Usuario";
import Endereco from "../../model/Endereco";
import Empresa from "../../model/Empresa";
import Candidato from "../../model/Candidato";

interface Input {
    title: string;
    id: string;
    type: string;
}

const defaultInputs: Input[] = [
    { title: 'Nome', id: 'nome', type: 'text'},
    { title: 'Email', id:'email', type: 'text'},
    { title: 'Senha', id:'senha', type: 'text'},
    { title: 'Descrição', id: 'descricao', type: 'text'},
    { title: 'Cep', id: 'cep', type: 'text'},
    { title: 'Estado', id: 'estado', type: 'text'},
    { title: 'Pais', id: 'pais', type: 'text'},
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
        form.setAttribute('data-registration-type', 'empresa')
    } else {
        text = 'Registro de Candidato';
        pageTitle.innerHTML = 'Criar Conta de Candidato'
        form.setAttribute('data-registration-type', 'candidato')
    }

    toggleUserTypeLabel.textContent = text;
    buildRegistrationForm();
}

const textInputBuilder = (input: Input): string => {
    return `
    <div class="form-section mb-3">
        <label for=${input.id} class="form-label">${input.title}</label>
        <input type=${input.type} id=${input.id} name=${input.id} class="form-control" >
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

    if (registrationType === 'candidato') {
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
        endereco: <Endereco> {id: 0, cep: "88063074", estado: "SC", pais: "Brasil"}
    }

    if (form.getAttribute('data-registration-type') === 'empresa') {
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

}

const addRegistrationFormEventListeners = () => {
    toggleUserTypeCheckbox.addEventListener('change', toggleForm);
    form.addEventListener('submit', submitRegistration);
}

export { buildRegistrationForm, addRegistrationFormEventListeners }
