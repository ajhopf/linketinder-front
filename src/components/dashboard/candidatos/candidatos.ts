import {getAllUsersByType, getCurrentUser} from "../../../service/user-service";

import Candidato from "../../../model/Candidato";
import Competencia from "../../../model/Competencia";
import {
    getCurtidasDoCurrentUser,
} from "../../../service/curtida-service";
import Curtida from "../../../model/Curtida";

let candidatosCurtidos: Curtida[] = [];

const showCandidatoSimpleCompetencias = (competencias: Competencia[]) => {
    const competenciasSorted = competencias.sort((a, b) => b.importancia - a.importancia);

    const principaisCompetencias = [competenciasSorted[0], competenciasSorted[1], competenciasSorted[2]];

    return principaisCompetencias.map((competencia: Competencia) => {
        return `
            <li class="col-3 m-0">
                <p class="m-0">${competencia.competencia}</p>
            </li>
        `
    })
}

const buildCandidatoSimpleCard = (candidato: Candidato) => {
    const liked = candidatosCurtidos.findIndex(item => item.candidatoId === Number(candidato.id)) >= 0;

    return `
        <div class="card m-3 col-10 col-md-5 p-0 candidato-card" id="vaga-card-${candidato.id}">
          <div class="card-header d-flex justify-content-between">
            <div>
                <img alt="robot image" class="rounded" style="height: 5rem; width: 5rem" src="https://robohash.org/${candidato.descricao}" />
            </div>                                
            <button class="btn btn-outline-light curtir-candidato-buttons" type="button">
                <img class="curtida-icone-${candidato.id}" id="candidato-icone-${candidato.id}" src="${liked ? '/assets/fire-liked.svg' : '/assets/fire.svg'}" data-candidato-id="${candidato.id}" style="height: 3rem; width: 3rem" alt="fire icon"/>
            </button>
          </div>   
          <div class="card-body">
               <h2 class="fs-5 text-center">Principais Competências</h2>
               <ul class="list-unstyled row gx-2 justify-content-center align-items-center m-0">
                    ${showCandidatoSimpleCompetencias(candidato.competencias).join('')}
                </ul>
          </div>      
        </div>
    `
}

const updateLocalCurtidas = () => {
    candidatosCurtidos = getCurtidasDoCurrentUser(getCurrentUser());
}

const buildCandidatosComponent = () => {
    const candidatos = getAllUsersByType<Candidato>("candidatos");

    try {
        updateLocalCurtidas();

        return `
        <div>
            <h1 class="text-center my-5">Candidatos</h1>
            <div>
                ${candidatos.map(candidato => buildCandidatoSimpleCard(candidato)).join('')}
            </div>
           
        </div>
             
    `
    } catch  (e) {
        console.log(e)
        return `<div>Não foi possível obter o usuário que está logado.</div>`
    }
}


export {buildCandidatosComponent, candidatosCurtidos, updateLocalCurtidas}