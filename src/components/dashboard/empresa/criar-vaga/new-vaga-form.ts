import {competenciasExigidasParaVaga, handleAddCompetencia} from "./input-handlers";
import {Vaga} from "../../../../model/Vaga";
import {createVaga} from "../../../../service/vagas-service";
import {genericHandleRemoveCompetencia} from "../../../shared/competencia-handlers";
import {competenciasInputBuilder} from "../../../shared/competencia-form-builder";

const buildVagaForm = () => {
    return `
        <form id="vaga-form" class="mb-3">
          <div class="row">
              <div class="mb-3 col-5">
                <label for="titulo" class="form-label">Título da Vaga</label>
                <input name="titulo" id="titulo" type="text" class="form-control"  required/>
              </div>
              <div class="mb-3 col-5">
                <label for="descricao"  class="form-label">Descrição da Vaga</label>
                <textarea name="descricao" id="descricao" type="text" class="form-control" required> </textarea>
              </div>
          </div>
          
          <div class="row">
            ${competenciasInputBuilder('empresas')}
          </div>
          <div class="d-flex justify-content-center mb-3">
            <small hidden id="form-error-message" class="text-danger text-center"></small>
          </div>
          <button type="submit" class="btn btn-primary w-100">Adicionar Vaga</button>
        </form>
    `
}

const removeFormError = () => {
    const formError = <HTMLElement> document.getElementById('form-error-message');

    if (!formError.getAttribute('hidden')) {
        formError.setAttribute('hidden', 'hidden')
    }
}

const showFormError = (message: string) => {
    const formError = <HTMLElement> document.getElementById('form-error-message');
    formError.innerText = message;
    formError.removeAttribute('hidden');
}

const clearVagaForm = () => {
    const form = <HTMLFormElement> document.getElementById('vaga-form');
    const competenciasList = <HTMLUListElement> document.getElementById('competencias-list')

    competenciasExigidasParaVaga.splice(0)

    for (let child of competenciasList.children) {
        child.removeEventListener('click', (event) => genericHandleRemoveCompetencia(event, competenciasExigidasParaVaga));
        child.remove();
    }

    competenciasList.innerHTML = '';

    removeFormError();
    form.reset();
}

const submitVaga = (event: SubmitEvent) => {
    event.preventDefault();
    const form = <HTMLFormElement> document.getElementById('vaga-form');

    const data = new FormData(form);

    if (competenciasExigidasParaVaga.length === 0) {
        showFormError("Adicione ao menos uma competência para a vaga.")
        return;
    }

    const vaga: Vaga = {
        id: 0,
        titulo: <string> data.get('titulo'),
        descricao: <string> data.get('descricao'),
        competencias: competenciasExigidasParaVaga,
        empresaId: JSON.parse(localStorage.getItem('loggedUser')!).id
    }

    if (vaga.descricao.trim().length === 0) {
        showFormError("Adicione um título para a vaga.");
        return;
    }

    if (vaga.titulo.trim().length === 0) {
        showFormError("A vaga deve ter uma descrição.");
        return;
    }

    createVaga(vaga);
    clearVagaForm();
}


const addEventListenersToVagaForm = () => {
    const addCompetenciaBtn = <HTMLButtonElement> document.getElementById("competencia-btn");

    addCompetenciaBtn.addEventListener('click', () => {
        handleAddCompetencia();
    })

    const form = <HTMLFormElement> document.getElementById('vaga-form');
    form.addEventListener('submit', submitVaga);
}

export {buildVagaForm, addEventListenersToVagaForm, clearVagaForm}