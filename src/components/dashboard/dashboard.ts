import {checkLoggedUser, logoutUser} from "./authentication";
import {buildProfileForm} from "./profile/profile";
import {buildCriarVagaComponent} from "./criar-vaga/criar-vaga";
import {addEventListeneresToVagaForm, clearVagaForm} from "./criar-vaga/new-vaga-form";
import {
    addDeleteVagaClickHandlers,
    buildMinhasVagasComponent
} from "./minhas-vagas/minhas-vagas";

let currentComponent: 'candidatos' | 'vagas' | 'criar-vaga' | 'perfil' = 'candidatos'

//containers
const mainContainer = <HTMLDivElement> document.getElementById("main-container");

//botoes
const logoutUserBtn = <HTMLButtonElement> document.getElementById("logout-btn");
const perfilBtn = <HTMLButtonElement> document.getElementById("perfil-btn");
const criarVagasBtn = <HTMLButtonElement> document.getElementById("criar-vaga-btn");
const minhasVagasBtn = <HTMLButtonElement> document.getElementById("minhas-vagas-btn");

const checkCurrentComponent = () => {
    if (currentComponent === 'criar-vaga') {
        clearVagaForm();
    }
}

logoutUserBtn.addEventListener('click', logoutUser);

perfilBtn.addEventListener('click', () => {
    checkCurrentComponent();

    mainContainer.innerHTML = buildProfileForm();
    currentComponent = 'perfil';
});

criarVagasBtn.addEventListener('click', () => {
    checkCurrentComponent();

    mainContainer.innerHTML = buildCriarVagaComponent();
    currentComponent = 'criar-vaga';
    addEventListeneresToVagaForm();
})

minhasVagasBtn.addEventListener('click', () => {
    checkCurrentComponent();

    mainContainer.innerHTML = buildMinhasVagasComponent();
    addDeleteVagaClickHandlers();
    currentComponent = 'vagas';
})


checkLoggedUser();