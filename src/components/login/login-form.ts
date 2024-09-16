import {loginUser} from "../../database/local-storage";

const loginForm = <HTMLFormElement> document.getElementById('login-form');
const toggleUserTypeCheckbox = <HTMLInputElement> document.getElementById("toggle-user-type-checkbox");
const toggleUserTypeLabel = <HTMLLabelElement> document.getElementById("toggle-user-type-label");
const formErrorMessage = <HTMLElement>document.getElementById("form-error-message");

const toggleForm = () => {
    const isEmpresa = toggleUserTypeCheckbox.checked;
    let text;

    isEmpresa ? text = 'Empresa' : text = 'Candidato'

    toggleUserTypeLabel.textContent = text;
}

const submitLoginForm = (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const email = <string> formData.get('email');
    const password = <string> formData.get('password');
    const type = toggleUserTypeCheckbox.checked ? 'empresas' : 'candidatos';

    try {
        loginUser(email, password, type);
    } catch (error) {
        formErrorMessage.removeAttribute('hidden')
        console.log(error);
    }
}

loginForm.addEventListener('submit', submitLoginForm);
toggleUserTypeCheckbox.addEventListener('change', toggleForm)