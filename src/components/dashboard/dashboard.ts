import {logoutUser} from "./authentication";
import {buildProfileForm} from "./profile/profile";
import {buildCriarVagaComponent} from "./criar-vaga/criar-vaga";
import {addEventListeneresToVagaForm, clearVagaForm} from "./criar-vaga/new-vaga-form";
import {
    addDeleteVagaClickHandlers,
    buildMinhasVagasComponent
} from "./minhas-vagas/minhas-vagas";
import {
    buildCandidatosComponent
} from "./candidatos/candidatos";
import {
    addCandidatosCardsEventListeners,
} from "./candidatos/event-listeners";
import {addCurtirCandidatoClickHandlers} from "./candidatos/handlers";
import {addChart} from "./candidatos/chart";

let currentComponent: 'candidatos' | 'vagas' | 'criar-vaga' | 'perfil' = 'candidatos'

//containers
const mainContainer = <HTMLDivElement> document.getElementById("main-container");

//botoes
const candidatosBtn = <HTMLButtonElement> document.getElementById("candidatos-btn")
const minhasVagasBtn = <HTMLButtonElement> document.getElementById("minhas-vagas-btn");
const criarVagasBtn = <HTMLButtonElement> document.getElementById("criar-vaga-btn");
const perfilBtn = <HTMLButtonElement> document.getElementById("perfil-btn");
const logoutUserBtn = <HTMLButtonElement> document.getElementById("logout-btn");

const renderCandidatosComponent = async () => {
    checkCurrentComponent();

    mainContainer.innerHTML = buildCandidatosComponent();
    currentComponent = 'candidatos';
    await addChart();
    addCurtirCandidatoClickHandlers();
    addCandidatosCardsEventListeners();
}

const checkCurrentComponent = () => {
    if (currentComponent === 'criar-vaga') {
        clearVagaForm();
    }

    if (currentComponent === 'candidatos') {
        // removeCandidatosCardsEventListeners();
    }
}

candidatosBtn.addEventListener('click', renderCandidatosComponent);

minhasVagasBtn.addEventListener('click', () => {
    checkCurrentComponent();

    mainContainer.innerHTML = buildMinhasVagasComponent();
    addDeleteVagaClickHandlers();
    currentComponent = 'vagas';
})

criarVagasBtn.addEventListener('click', () => {
    checkCurrentComponent();

    mainContainer.innerHTML = buildCriarVagaComponent();
    currentComponent = 'criar-vaga';
    addEventListeneresToVagaForm();
})

perfilBtn.addEventListener('click', () => {
    checkCurrentComponent();

    mainContainer.innerHTML = buildProfileForm();
    currentComponent = 'perfil';
});

logoutUserBtn.addEventListener('click', logoutUser);

renderCandidatosComponent();
