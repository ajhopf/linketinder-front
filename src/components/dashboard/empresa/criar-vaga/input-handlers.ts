import Competencia from "../../../../model/Competencia";

const competenciasExigidasParaVaga: Competencia[] = [];

const handleRemoveCompetencia = (event: Event) => {
    const eventTarget = event.currentTarget as HTMLLIElement;

    if (eventTarget) {
        const liId = eventTarget.id;
        const idx = competenciasExigidasParaVaga.findIndex(competencia => competencia.competencia === liId);
        competenciasExigidasParaVaga.splice(idx, 1);
    }

    eventTarget.removeEventListener('click', handleRemoveCompetencia);
    eventTarget.remove();
}

const handleAddCompetencia = () => {
    const competenciaInput = <HTMLInputElement> document.getElementById('competencia');
    const competenciaExperiencia = <HTMLInputElement> document.getElementById('experiencia-competencia')
    const importanciaExperiencia = <HTMLInputElement> document.getElementById('importancia-competencia')
    const competenciasList = <HTMLUListElement> document.getElementById('competencias-list');

    if (competenciaInput.value.length > 0 && Number(competenciaExperiencia.value) > 0) {
        if (competenciasExigidasParaVaga.find(competencia => competencia.competencia === competenciaInput.value)) {
            return;
        }

        const newCompetencia: Competencia = {
            competencia: <string> competenciaInput.value,
            anosExperencia: Number(competenciaExperiencia.value),
            importancia: Number(importanciaExperiencia.value)
        }

        competenciasExigidasParaVaga.push(newCompetencia);

        competenciasList.innerHTML += `
            <li id="${competenciaInput.value}" class="list-group-item d-flex justify-content-around" style="cursor: pointer">
                <p class="mb-0">${competenciaInput.value}</p>
                <p class="mb-0">|</p>
                <p class="mb-0">${Number(competenciaExperiencia.value)} anos</p>
                <p class="mb-0">|</p>
                <p class="mb-0">Importância: ${Number(importanciaExperiencia.value)}</p>
            </li>`

        document.getElementById(competenciaInput.value)!.addEventListener('click', handleRemoveCompetencia)

        competenciaInput.value = '';
        competenciaExperiencia.value = '';
    }
}

export {handleAddCompetencia, handleRemoveCompetencia, competenciasExigidasParaVaga}
