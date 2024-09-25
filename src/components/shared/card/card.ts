import Competencia from "../../../model/Competencia";
import {Vaga} from "../../../model/Vaga";
import Candidato from "../../../model/Candidato";
import {Curtida, CurtidaEmCandidato, CurtidaEmVaga} from "../../../model/Curtida";

const showSimpleCompetencias = (competencias: Competencia[]) => {
    const competenciasSorted = competencias.sort((a, b) => b.importancia - a.importancia);

    const principaisCompetencias: Competencia[] = [];

    for (let i = 0; i < competenciasSorted.length && i < 3; i++) {
        principaisCompetencias.push(competenciasSorted[i]);
    }

    return principaisCompetencias.map((competencia: Competencia) => {

        return `
            <li class="col-3 m-0">
                <p class="m-0">${competencia.competencia}</p>
            </li>
        `
    })
}

const buildCompetenciaListForTooltip = (competencias: Competencia[]) => {
    const listItems = competencias.map(competencia => `<li>${competencia.competencia}</li>`).join('');
    return `<ul>${listItems}</ul>`;
}

const buildSimpleCard = (item: Candidato | Vaga, itemsCurtidosDoLoggedUser: Curtida[]) => {
    let liked;

    if ('titulo' in item) {
        const curtidasEmVagas = <CurtidaEmVaga[]> itemsCurtidosDoLoggedUser;

        liked = curtidasEmVagas.findIndex(vaga => vaga.vagaId === Number(item.id)) >= 0;
    } else {
        const curtidaEmCandidato = <CurtidaEmCandidato[]> itemsCurtidosDoLoggedUser;

        liked = curtidaEmCandidato.findIndex(curtida => curtida.candidatoId === item.id) >= 0;
    }

    return `
        <div 
            role="button"
            data-bs-toggle="popover"           
            data-bs-title="Todas Competências"
            class="card m-3 col-10 col-md-4 p-0 item-card" 
            id="item-card-${item.id}">
          <div class="card-header d-flex justify-content-between">
            <div>
                <img alt="robot image" class="rounded" style="height: 5rem; width: 5rem" src="https://robohash.org/${item.descricao}" />
            </div>                                
            <button class="btn btn-outline-light curtir-candidato-buttons" type="button">
                <img 
                class="curtida-icone-${item.id}" 
                id="candidato-icone-${item.id}" 
                src="${liked ? '/assets/fire-liked.svg' : '/assets/fire.svg'}" 
                data-candidato-id="${item.id}" 
                style="height: 3rem; width: 3rem" alt="fire icon"/>
            </button>
          </div>   
          <div class="card-body">
               <h2 class="fs-5 text-center">Principais Competências</h2>
               <ul class="list-unstyled row gx-2 justify-content-center align-items-center m-0">
                    ${showSimpleCompetencias(item.competencias).join('')}
                </ul>
          </div>      
        </div>
    `
}

export {buildSimpleCard, buildCompetenciaListForTooltip}