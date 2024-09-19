import {addChart, buildChartComponent} from "../../chart";
import {getAllVagas} from "../../../../service/vagas-service";
import {CurtidaEmVaga} from "../../../../model/Curtida";

import {Vaga} from "../../../../model/Vaga";
import Competencia from "../../../../model/Competencia";
import {getCurtidasDoCurrentUser} from "../../../../service/curtida-service";
import {getCurrentUser} from "../../../../service/user-service";
import {addVagasCardsEventListeners} from "./event-listeners";

let vagasCurtidas: CurtidaEmVaga[] = [];

const updateLocalVagasCurtidas = () => {
    vagasCurtidas = getCurtidasDoCurrentUser(getCurrentUser()) as CurtidaEmVaga[];
}

const showVagaSimpleCompetencias = (competencias: Competencia[]) => {
    const competenciasSorted = competencias.sort((a, b) => b.importancia - a.importancia);

    const principaisCompetencias: Competencia[] = [];

    for (let i = 0; i < competenciasSorted.length && i < 3; i++) {
        principaisCompetencias.push(competenciasSorted[i]);
    }

    return principaisCompetencias.map((competencia: Competencia) => {
        console.log(competencia)
        return `
            <li class="col-3 m-0">
                <p class="m-0">${competencia.competencia}</p>
            </li>
        `
    })
}

const buildVagaSimpleCard = (vaga: Vaga) => {
    const liked = vagasCurtidas.findIndex(item => item.vagaId === Number(vaga.id)) >= 0;

    return `
        <div class="card m-3 col-10 col-md-4 p-0 vaga-card" id="vaga-card-${vaga.id}">
          <div class="card-header d-flex justify-content-between">
            <div>
                <img alt="robot image" class="rounded" style="height: 5rem; width: 5rem" src="https://robohash.org/${vaga.descricao}?set=set2" />
            </div>                                
            <button class="btn btn-outline-light curtir-vaga-buttons" type="button">
                <img class="curtida-icone-${vaga.id}" id="vaga-icone-${vaga.id}" src="${liked ? '/assets/fire-liked.svg' : '/assets/fire.svg'}" data-vaga-id="${vaga.id}" style="height: 3rem; width: 3rem" alt="fire icon"/>
            </button>
          </div>   
          <div class="card-body">
               <h2 class="fs-5 text-center">Principais Competências Exigidas</h2>
               <ul class="list-unstyled row gx-2 justify-content-center align-items-center m-0">
                    ${showVagaSimpleCompetencias(vaga.competencias).join('')}
                </ul>
          </div>      
        </div>
    `
}

const buildVagasDisponiveisInnerContent = () => {
    const vagas = getAllVagas();

    try {
        updateLocalVagasCurtidas();

        return `
        <div>
            ${buildChartComponent('Vagas por Competência')}
        </div>
        <div> 
            <h1 class="text-center my-5">Vagas Disponíveis</h1>
            <div class="row justify-content-center">
                ${vagas.map(vaga => buildVagaSimpleCard(vaga)).join('')}
            </div> 
        </div>
    `
    } catch  (e) {
        console.log(e)
        return `<div>Não foi possível obter o usuário que está logado.</div>`
    }
}

const buildVagasDisponiveisComponent = async () => {
    const mainContainer = <HTMLDivElement> document.getElementById('main-container');
    mainContainer.innerHTML = buildVagasDisponiveisInnerContent();

    const vagas = <Vaga[]> getAllVagas();
    await addChart(vagas, 'Vagas com a competência: ');

    addVagasCardsEventListeners();
    updateLocalVagasCurtidas();
}

export {buildVagasDisponiveisComponent, vagasCurtidas, updateLocalVagasCurtidas}