import {buildVagaForm} from "./new-vaga-form";
import {addEventListenersToVagaForm} from "./event-listeners";

const buildCriarVagaInnerContent = () => {
    return `
        <div>
            <h1 class="text-center my-5">Criar vaga</h1>
            ${buildVagaForm()}           
        </div>
    `
}

const buildCriarVagaComponent = () => {
    const mainContainer = <HTMLDivElement> document.getElementById('main-container')
    mainContainer.innerHTML = buildCriarVagaInnerContent();
    addEventListenersToVagaForm();
}
export {buildCriarVagaComponent}