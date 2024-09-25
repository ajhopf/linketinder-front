import {Vaga} from "../../../../model/Vaga";
import {createVaga} from "../../../../service/vagas-service";
import {competenciasInputBuilder} from "../../../shared/competencia-form-builder";
import {FormInvalidError} from "../../../../errors/registration-form-errors/form-invalid-error";
import Competencia from "../../../../model/Competencia";

interface CriarVagaValidationErrors {
    descricao: boolean,
    titulo: boolean
}

const criarVagaValidationErrors: CriarVagaValidationErrors = {
    descricao: true,
    titulo: true
}

const competenciasExigidasParaVaga: Competencia[] = [];

const buildVagaForm = () => {
    return `
        <form id="vaga-form" class="mb-3">
          <div class="row">
              <div class="mb-3 col-5">
                <label for="titulo" class="form-label">Título da Vaga</label>
                <input name="titulo" id="titulo" type="text" class="form-control"  required/>
                <div class="d-flex justify-content-center mb-3">
                   <small hidden id="titulo-error-message" class="text-danger text-center"></small>
                </div>
              </div>
              <div class="mb-3 col-5">
                <label for="descricao"  class="form-label">Descrição da Vaga</label>
                <textarea name="descricao" id="descricao" type="text" class="form-control" required> </textarea>
                <div class="d-flex justify-content-center mb-3">
                   <small hidden id="descricao-error-message" class="text-danger text-center"></small>
                </div>
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

const clearVagaForm = () => {
    const form = <HTMLFormElement> document.getElementById('vaga-form');
    const competenciasList = <HTMLUListElement> document.getElementById('competencias-list')

    competenciasExigidasParaVaga.splice(0)

    for (let child of competenciasList.children) {
        child.remove();
    }

    competenciasList.innerHTML = '';

    removeFormError();
    form.reset();
}

const checkFormErrors = () => {
    let key: keyof CriarVagaValidationErrors

    for (key in criarVagaValidationErrors) {
        if (criarVagaValidationErrors[key]) {
            throw new FormInvalidError(`Formulário inválido. Campo: ${key}`)
        }
    }

    if (competenciasExigidasParaVaga.length === 0) {
        throw new FormInvalidError('Adicione ao menos uma competência')
    }
}


const submitVaga = (event: SubmitEvent) => {
    event.preventDefault();

    try {
        const form = <HTMLFormElement> document.getElementById('vaga-form');

        checkFormErrors();

        const data = new FormData(form);

        const vaga: Vaga = {
            id: 0,
            titulo: <string> data.get('titulo'),
            descricao: <string> data.get('descricao'),
            competencias: competenciasExigidasParaVaga,
            empresaId: JSON.parse(localStorage.getItem('loggedUser')!).id
        }

        createVaga(vaga);
        clearVagaForm();
    } catch (e) {
        if (e instanceof FormInvalidError) {
            const formError = <HTMLElement> document.getElementById('form-error-message');
            formError.innerText = e.message;
            formError.removeAttribute('hidden')
        }
    }

}


export {buildVagaForm, clearVagaForm, submitVaga, criarVagaValidationErrors, CriarVagaValidationErrors, competenciasExigidasParaVaga}