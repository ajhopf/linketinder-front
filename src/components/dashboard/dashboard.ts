import {checkLoggedUser, logoutUser} from "./authentication";
import {buildProfileComponent} from "./profile/profile";
import {buildCriarVagaComponent} from "./empresa/criar-vaga/criar-vaga";
import {clearVagaForm} from "./empresa/criar-vaga/new-vaga-form";
import {buildMinhasVagasComponent} from "./empresa/minhas-vagas/minhas-vagas";
import {buildCandidatosComponent, removeCandidatosCards} from "./empresa/candidatos/candidatos";
import {getCurrentUser} from "../../service/user-service";
import {buildVagasDisponiveisComponent} from "./candidato/vagas-disponiveis/vagas-disponiveis";
import {genericCloseModal} from "../shared/modal/modal-handlers";

let currentComponent: 'candidatos' | 'vagas' | 'criar-vaga' | 'perfil' | 'vagas-disponiveis'

const renderCandidatosComponent = async () => {
    checkCurrentComponent();
    await buildCandidatosComponent();
    currentComponent = 'candidatos';
}

const renderMinhasVagasComponent = () => {
    checkCurrentComponent();
    buildMinhasVagasComponent();
    currentComponent = 'vagas';
}

const renderCriarVagaComponent = () => {
    checkCurrentComponent();
    buildCriarVagaComponent();

    currentComponent = 'criar-vaga';
}

const renderPerfilComponent = () => {
    checkCurrentComponent();
    buildProfileComponent();

    currentComponent = 'perfil'
}

const renderVagasDisponiveisComponent = () => {
    checkCurrentComponent();
    buildVagasDisponiveisComponent();

    currentComponent = 'vagas-disponiveis';
}

const checkCurrentComponent = () => {
    if (currentComponent === 'criar-vaga') {
        clearVagaForm();
    }

    if (currentComponent === 'candidatos') {
        removeCandidatosCards();
    }
}

const perfilBtn = <HTMLButtonElement> document.getElementById("perfil-btn");
const logoutUserBtn = <HTMLButtonElement> document.getElementById("logout-btn");
perfilBtn.addEventListener('click', renderPerfilComponent);
logoutUserBtn.addEventListener('click', logoutUser);

const closeModalBtn = <HTMLButtonElement> document.getElementById('close-modal-btn');
const modalBackground = <HTMLDivElement> document.getElementById('modal-background')
const modalCardContainer = <HTMLDivElement> document.getElementById('modal-card-container');

closeModalBtn.addEventListener('click', genericCloseModal);
modalBackground.addEventListener('click', genericCloseModal);
modalCardContainer.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from reaching the parent div
});

const empresaLayout = () => {
    const candidatosBtn = <HTMLButtonElement> document.getElementById("candidatos-btn")
    const minhasVagasBtn = <HTMLButtonElement> document.getElementById("minhas-vagas-btn");
    const criarVagasBtn = <HTMLButtonElement> document.getElementById("criar-vaga-btn");

    candidatosBtn.addEventListener('click', renderCandidatosComponent);
    minhasVagasBtn.addEventListener('click', renderMinhasVagasComponent);
    criarVagasBtn.addEventListener('click', renderCriarVagaComponent)

    renderCandidatosComponent();
}

const candidatoLayout = () => {
    const vagasDisponiveisBtn = <HTMLButtonElement> document.getElementById("vagas-disponiveis-btn");

    vagasDisponiveisBtn.addEventListener('click', renderVagasDisponiveisComponent);

    renderVagasDisponiveisComponent();
}

checkLoggedUser();
const user = getCurrentUser();

if (user.type === 'empresas') {
    empresaLayout();
} else {
    candidatoLayout();
}


