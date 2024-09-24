import {getAllUsersByType, getCurrentUser} from "../../../../service/user-service";

import Candidato from "../../../../model/Candidato";
import {getCurtidasDoCurrentUser} from "../../../../service/curtida-service";
import {CurtidaEmCandidato} from "../../../../model/Curtida";
import {addChart, buildChartComponent} from "../../chart";
import {addCandidatosCardsEventListeners} from "./event-listeners";
import {buildSimpleCard} from "../../../shared/card/card";

let candidatosCurtidos: CurtidaEmCandidato[] = [];

const updateLocalCurtidas = () => {
    candidatosCurtidos = getCurtidasDoCurrentUser(getCurrentUser()) as CurtidaEmCandidato[];
}

const buildCandidatosInnerContent = () => {
    const candidatos = getAllUsersByType<Candidato>("candidatos");

    try {
        updateLocalCurtidas();
        return `
        <div>
            ${buildChartComponent('Candidatos por Competência')}
        </div>
        <div> 
            <h1 class="text-center my-5">Candidatos</h1>
            <div class="row justify-content-center">
                ${candidatos.map(candidato => buildSimpleCard(candidato, candidatosCurtidos)).join('')}
            </div>
           
        </div>
             
    `
    } catch  (e) {
        console.log(e)
        return `<div>Não foi possível obter o usuário que está logado.</div>`
    }
}

const buildCandidatosComponent = async () => {
    const mainContainer = <HTMLDivElement> document.getElementById('main-container');
    mainContainer.innerHTML = buildCandidatosInnerContent();
    const users = <Candidato[]> getAllUsersByType('candidatos');
    await addChart(users, 'Candidatos por competência: ');
    addCandidatosCardsEventListeners();
}

const removeCandidatosCards = () => {
    const cards = <HTMLCollectionOf<HTMLDivElement>> document.getElementsByClassName('items-card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.remove();
    }
}

export {buildCandidatosComponent, removeCandidatosCards, candidatosCurtidos, updateLocalCurtidas}