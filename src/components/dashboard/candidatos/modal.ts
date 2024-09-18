import Candidato from "../../../model/Candidato";
import {candidatosCurtidos} from "./candidatos";
import Competencia from "../../../model/Competencia";

const showCandidatoCompetencias = (competencias: Competencia[]) => {
    return competencias.map((competencia: Competencia) => {
        return `
            <li class="col-3 mx-1 border border-1 border-black rounded-1">
                <p>Competência: ${competencia.competencia}</p>
                <p>Anos de Experiência: ${competencia.anosExperencia}</p>
                <p>Afinidade: ${competencia.importancia}</p>
            </li>
        `
    });
}

const buildCandidatoModalCard = (candidato: Candidato) => {
    const liked = candidatosCurtidos.findIndex(item => item.candidatoId === Number(candidato.id)) >= 0;

    return `

          <div class="card-header d-flex justify-content-between">
            <div>
                <img alt="robot image" class="rounded" style="height: 5rem; width: 5rem" src="https://robohash.org/${candidato.descricao}" />
            </div>
             <button class="btn btn-outline-light curtir-candidato-buttons" type="button" data-candidato-id="${candidato.id}" id="curtir-candidato">
                <img class="curtida-icone-${candidato.id}" id="candidato-icone-${candidato.id}" src="${liked ? '/assets/fire-liked.svg' : '/assets/fire.svg'}" data-candidato-id="${candidato.id}" style="height: 3rem; width: 3rem" alt="fire icon"/>
            </button>
          </div>
          <div class="card-body height-0" style="overflow: hidden; transition: max-height 0.3s ease-in-out;">
            <p class="card-text p-3">Descrição: ${candidato.descricao}</p>
            <h3 class="card-title p-3 text-center">Competências</h3>
            <ul class="row flex-wrap justify-content-center g-2 list-unstyled">
               ${showCandidatoCompetencias(candidato.competencias).join('')}
            </ul>
          </div>

    `
}

export {buildCandidatoModalCard};