import Competencia from "../../../model/Competencia";
import {validateCompetencia} from "../../../utils/form-validations/competencia";

const addCompetencia = (competenciasArray: Competencia[]) => {
    const competenciaInput = <HTMLInputElement> document.getElementById('competencia');
    const competenciaExperiencia = <HTMLInputElement> document.getElementById('experiencia-competencia');
    const importanciaCompetencia = <HTMLInputElement> document.getElementById('importancia-competencia');
    const competenciasList = <HTMLUListElement> document.getElementById('competencias-list');

    validateCompetencia(competenciaInput.value);

    if (competenciaInput.value.length > 0 && Number(competenciaExperiencia.value) > 0) {
        if (competenciasArray.find(competencia => competencia.competencia.toUpperCase() === competenciaInput.value.toUpperCase())) {
            return;
        }

        const newCompetencia: Competencia = {
            competencia: <string> competenciaInput.value,
            anosExperencia: Number(competenciaExperiencia.value),
            importancia: Number(importanciaCompetencia.value)
        }

        console.log('new competencia: ', newCompetencia)

        competenciasArray.push(newCompetencia);

        const li = document.createElement('li')
        li.id = competenciaInput.value;
        li.setAttribute('role', 'button')
        li.className = "list-group-item d-flex justify-content-around";
        li.innerHTML = `
             <p class="mb-0">${competenciaInput.value}</p>
             <p class="mb-0">|</p>
             <p class="mb-0">${Number(competenciaExperiencia.value)} anos</p>
             <p class="mb-0">|</p>
             <p class="mb-0">Importância: ${Number(importanciaCompetencia.value)}</p>
        `
        li.addEventListener('click', (event) => genericHandleRemoveCompetencia(event, competenciasArray));

        competenciasList.appendChild(li);

        competenciaInput.value = '';
        competenciaExperiencia.value = '';
    }
}

const handleAddCompetencia = (competencias: Competencia[]) => {
    const competenciaError = <HTMLElement> document.getElementById('competencia-error-message');
    try {
        addCompetencia(competencias);
        if (!competenciaError.hasAttribute('hidden')) {
            competenciaError.setAttribute('hidden', 'true');
        }
    } catch (e: any) {
        competenciaError.removeAttribute('hidden');
        competenciaError.innerText = e.message;
    }
}


const genericHandleRemoveCompetencia = (event: Event, userCompetencias: Competencia[]) => {
    const eventTarget = event.currentTarget as HTMLLIElement;

    if (eventTarget) {
        const liId = eventTarget.id;

        console.log(liId);
        console.log('user competencias antes do splice: ', userCompetencias)

        const idx = userCompetencias.findIndex(competencia => competencia.competencia === liId);
        userCompetencias.splice(idx, 1);

        console.log('user competencias depois do splice: ', userCompetencias)
    }

    eventTarget.removeEventListener('click', (event) => genericHandleRemoveCompetencia(event, userCompetencias));
    eventTarget.remove();
}

export {handleAddCompetencia, addCompetencia, genericHandleRemoveCompetencia}