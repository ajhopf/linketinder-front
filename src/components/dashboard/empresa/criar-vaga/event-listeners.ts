import {competenciasExigidasParaVaga, handleTituloAndDescricaoBlur} from "./input-handlers";
import {submitVaga} from "./new-vaga-form";
import {handleAddCompetencia} from "../../../shared/competencia-form/competencia-handlers";

const addEventListenersToVagaForm = () => {
    const addCompetenciaBtn = <HTMLButtonElement> document.getElementById("competencia-btn");

    addCompetenciaBtn.addEventListener('click', () => handleAddCompetencia(competenciasExigidasParaVaga));

    const tituloInput = <HTMLInputElement> document.getElementById("titulo");
    tituloInput.addEventListener('blur', () => handleTituloAndDescricaoBlur("titulo"));

    const descricaoInput = <HTMLInputElement> document.getElementById("descricao");
    descricaoInput.addEventListener('blur', () => handleTituloAndDescricaoBlur("descricao"));

    const form = <HTMLFormElement> document.getElementById('vaga-form');
    form.addEventListener('submit', submitVaga);
}

export {addEventListenersToVagaForm}