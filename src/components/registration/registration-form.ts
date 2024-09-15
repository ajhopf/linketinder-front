interface Input {
    title: string;
    id: string;
    type: string;
}

const defaultInputs: Input[] = [
    { title: 'Nome', id: 'nome', type: 'text'},
    { title: 'Email', id:'email', type: 'text'},
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

const form = document.getElementById('registration-form')!;
const toggleUserTypeCheckbox = <HTMLInputElement> document.getElementById("toggle-user-type-checkbox")!;
const toggleUserTypeLabel = document.getElementById("toggle-user-type-label")!;
const pageTitle = document.getElementById("page-title")!;


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
        <input type=${input.type} id=${input.id} name=${input.id} class="form-control" required>
    </div>
   `
};

const buildRegistrationForm = () => {
    const inputContainer = document.getElementById("inputs-container");
    const registrationType = form.getAttribute("data-registration-type")

    if (!inputContainer) {
        return
    }

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

const addRegistrationFormEventListeners = () => {
    const toggleUserTypeCheckbox = <HTMLInputElement> document.getElementById("toggle-user-type-checkbox")!;
    toggleUserTypeCheckbox.addEventListener('change', toggleForm);
}

export { buildRegistrationForm, addRegistrationFormEventListeners }
