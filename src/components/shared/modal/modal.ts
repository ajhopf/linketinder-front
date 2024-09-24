import Competencia from "../../../model/Competencia";
import Candidato from "../../../model/Candidato";
import {Vaga} from "../../../model/Vaga";
import {CurtidaEmCandidato, CurtidaEmVaga} from "../../../model/Curtida";

const showCompetencias = (competencias: Competencia[]) => {
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

const buildCandidatoCardBody = (candidato: Candidato) => {
    return `        
        <p class="card-text p-3">Descrição: ${candidato.descricao}</p>
        <h3 class="card-title p-3 text-center">Competências</h3>
        <ul class="row flex-wrap justify-content-center g-2 list-unstyled">
           ${showCompetencias(candidato.competencias).join('')}
        </ul>   
    `
}

const buildVagaCardBody = (vaga: Vaga) => {
    return `
        <h2 class="card-title">Título: ${vaga.titulo}</h2>
        <p class="card-text p-3">Descrição: ${vaga.descricao}</p>
        <h3 class="card-title p-3 text-center">Competências</h3>
        <ul class="row flex-wrap justify-content-center g-2 list-unstyled">
            ${showCompetencias(vaga.competencias).join('')}
        </ul>  
    `
}

const buildModalCard = (item: Candidato | Vaga, curtidas: CurtidaEmCandidato[] | CurtidaEmVaga[] ) => {
    let liked;
    let cardBody;
    
    if ('titulo' in item) {
        cardBody = buildVagaCardBody(item);

        const curtidasEmVagas = <CurtidaEmVaga[]> curtidas;

        liked = curtidasEmVagas.findIndex(vaga => vaga.vagaId === Number(item.id)) >= 0;
    } else {
        cardBody = buildCandidatoCardBody(item);

        const curtidaEmCandidato = <CurtidaEmCandidato[]> curtidas;

        liked = curtidaEmCandidato.findIndex(curtida => curtida.candidatoId === item.id) >= 0;
    }

    return `
          <div id="modal-card" class="card-header d-flex justify-content-between">
            <div>
                <img alt="robot image" class="rounded" style="height: 5rem; width: 5rem" src="https://robohash.org/${item.descricao}" />
            </div>
             <button class="btn btn-outline-light curtir-candidato-buttons" type="button" data-item-id="${item.id}" id="modal-curtir-btn">
                <img 
                class="curtida-icone-${item.id}" 
                id="candidato-icone-${item.id}" 
                src="${liked ? '/assets/fire-liked.svg' : '/assets/fire.svg'}" 
                data-candidato-id="${item.id}" 
                style="height: 3rem; 
                width: 3rem" alt="fire icon"/>
            </button>
          </div>
          <div class="card-body height-0" style="overflow: hidden; transition: max-height 0.3s ease-in-out;">
            ${ cardBody }
          </div>
    `
}

export {buildModalCard};