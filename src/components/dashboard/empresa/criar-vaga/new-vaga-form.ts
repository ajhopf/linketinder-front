import {Vaga} from "../../../../model/Vaga";
import {createVaga} from "../../../../service/vagas-service";
import {competenciasInputBuilder} from "../../../shared/competencia-form/competencia-form-builder";
import {FormInvalidError} from "../../../../errors/registration-form-errors/form-invalid-error";
import Competencia from "../../../../model/Competencia";
import {Toast} from "bootstrap";

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
        <div class="row justify-content-center">
            <form id="vaga-form" class="mb-3 col-12">
              <div class="row justify-content-center">
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
              
              <div class="row justify-content-center">
                ${competenciasInputBuilder('empresas')}
              </div>
              <div class="d-flex justify-content-center mb-3">
                <small hidden id="form-error-message" class="text-danger text-center"></small>
              </div>
              <button type="submit" class="btn btn-primary w-100">Adicionar Vaga</button>
            </form>
        </div>
        <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
            <div id="vaga-criada-toast"  class="toast bg-success" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="toast-header">
                <strong class="me-auto">Vaga criada com sucesso</strong>       
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
              <div class="toast-body">
                <p id="toast-text" class="text-white"></p>
              </div>
            </div>
        </div>
        
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

        const toastEl = <HTMLDivElement> document.getElementById('vaga-criada-toast');
        const toastText = <HTMLParagraphElement> document.getElementById('toast-text');
        toastText.innerText = "Título da vaga criada: " + vaga.titulo;

        const toast = new Toast(toastEl);
        toast.show();

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