import {vagasCurtidas} from "./vagas-disponiveis";
import {Vaga} from "../../../../model/Vaga";
import Competencia from "../../../../model/Competencia";

const showVagaCompetencias = (competencias: Competencia[]) => {
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

const buildVagaModalCard = (vaga: Vaga) => {
    const liked = vagasCurtidas.findIndex(item => item.vagaId === Number(vaga.id)) >= 0;

    return `
          <div class="card-header d-flex justify-content-between">
            <div>
                <img alt="robot image" class="rounded" style="height: 5rem; width: 5rem" src="https://robohash.org/${vaga.descricao}?set=set2" />
            </div>
             <button class="btn btn-outline-light" type="button" data-vaga-id="${vaga.id}" id="curtir-vaga">
                <img class="curtida-icone-${vaga.id}" id="vaga-icone-${vaga.id}" src="${liked ? '/assets/fire-liked.svg' : '/assets/fire.svg'}" data-candidato-id="${vaga.id}" style="height: 3rem; width: 3rem" alt="fire icon"/>
            </button>
          </div>
          <div class="card-body height-0" style="overflow: hidden; transition: max-height 0.3s ease-in-out;">
            <h2 class="card-title">Título: ${vaga.titulo}</h2>
            <p class="card-text p-3">Descrição: ${vaga.descricao}</p>
            <h3 class="card-title p-3 text-center">Competências</h3>
            <ul class="row flex-wrap justify-content-center g-2 list-unstyled">
               ${showVagaCompetencias(vaga.competencias).join('')}
            </ul>
          </div>

    `
}

export {buildVagaModalCard}