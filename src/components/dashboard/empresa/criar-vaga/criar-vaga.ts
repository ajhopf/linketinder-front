import {addEventListeneresToVagaForm, buildVagaForm} from "./new-vaga-form";

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
    addEventListeneresToVagaForm();
}
export {buildCriarVagaComponent}