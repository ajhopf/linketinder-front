import {getCurrentUser} from "../../../../service/user-service";
import {UsuarioLogado} from "../../../../model/Usuario";
import {getVagasDaEmpresa, deleteVaga} from "../../../../service/vagas-service";
import {Vaga} from "../../../../model/Vaga";
import Competencia from "../../../../model/Competencia";


const buildCompetenciaDiv = (competencia: Competencia) => {
    return `
        <div class="d-flex flex-column flex-lg-row justify-content-around bg-secondary mb-1 p-3 rounded-2" style="--bs-bg-opacity: .3;">
            <p>${competencia.competencia} </p>
            <p>Experiência: ${competencia.anosExperencia} ${competencia.anosExperencia === 1 ? 'ano' : 'anos'} </p>
            <p>Importância: ${competencia.importancia}</p>
        </div>`
}

const buildVagaCard = (vaga: Vaga) => {
    return `
        <div class="card m-3 col-10 col-md-5 p-0" id="vaga-card-${vaga.id}">
          <div class="card-body">
            <h2 class="card-title">${vaga.titulo}</h2>
            <p class="card-text">${vaga.descricao}</p>
            <h3>Competências exigidas:</h3>
            ${vaga.competencias.map(competencia => buildCompetenciaDiv(competencia)).join('')}
          </div>
          <div class="card-footer d-flex">
            <button class="btn btn-outline-danger flex-grow-1 delete-vaga-buttons" type="button" id="delete-vaga-${vaga.id}">Deletar Vaga</button>
          </div>
        </div>
    `
}

const addDeleteVagaClickHandlers = () => {
    const deleteButtons = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName('delete-vaga-buttons');

    for (let i = 0; i < deleteButtons.length; i++) {
        const deleteButton = deleteButtons[i];
        const vagaId = deleteButton.id.split('-')[2];

        deleteButton.addEventListener('click', () => {
            try {
                deleteVaga(Number(vagaId));
                const vagaCard = <HTMLElement> document.getElementById(`vaga-card-${vagaId}`)
                vagaCard.remove();
            } catch (error) {
                alert('Não foi possível deletar a vaga!')
            }
        })
    }
}



const buildMinhasVagasInnerContent = () => {
    const currentUser: UsuarioLogado = getCurrentUser();

    const vagasDaEmpresa: Vaga[] = getVagasDaEmpresa(currentUser.id);

    return `
        <div>
            <h1 class="text-center my-5">Minhas Vagas</h1>
            <div class="row justify-content-center">
                ${vagasDaEmpresa.map(vaga => buildVagaCard(vaga)).join('')}
            </div>
        </div>
    `
}

const buildMinhasVagasComponent = () => {
    const mainContainer = <HTMLDivElement> document.getElementById('main-container');

    mainContainer.innerHTML = buildMinhasVagasInnerContent();
    addDeleteVagaClickHandlers();
}

export {buildMinhasVagasComponent, addDeleteVagaClickHandlers}