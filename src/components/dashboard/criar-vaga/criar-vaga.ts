import {buildVagaForm} from "./new-vaga-form";

const buildCriarVagaComponent = () => {
    return `
        <div>
            <h1 class="text-center my-5">Criar vaga</h1>
            ${buildVagaForm()}        
        </div>
    `
}

export {buildCriarVagaComponent}