import {addChart, buildChartComponent} from "../../chart";
import {getAllVagas} from "../../../../service/vagas-service";
import {CurtidaEmVaga} from "../../../../model/Curtida";
import {Vaga} from "../../../../model/Vaga";
import {getCurtidasDoCurrentUser} from "../../../../service/curtida-service";
import {getCurrentUser} from "../../../../service/user-service";
import {addVagasCardsEventListeners} from "./event-listeners";
import {buildSimpleCard} from "../../../shared/card/card";

let vagasCurtidas: CurtidaEmVaga[] = [];

const updateLocalVagasCurtidas = () => {
    vagasCurtidas = getCurtidasDoCurrentUser(getCurrentUser()) as CurtidaEmVaga[];
}

const buildVagasDisponiveisInnerContent = () => {
    const vagas = getAllVagas();

    try {
        updateLocalVagasCurtidas();

        return `
        <div>
            ${buildChartComponent('Vagas por Competência')}
        </div>
        <div> 
            <h1 class="text-center my-5">Vagas Disponíveis</h1>
            <div class="row justify-content-center">
                ${vagas.map(vaga => buildSimpleCard(vaga, vagasCurtidas)).join('')}
            </div> 
        </div>
    `
    } catch  (e) {
        return `<div>Não foi possível obter o usuário que está logado.</div>`
    }
}

const buildVagasDisponiveisComponent = async () => {
    const mainContainer = <HTMLDivElement> document.getElementById('main-container');
    mainContainer.innerHTML = buildVagasDisponiveisInnerContent();

    const vagas = <Vaga[]> getAllVagas();
    await addChart(vagas, 'Vagas com a competência: ');

    addVagasCardsEventListeners();
    updateLocalVagasCurtidas();
}

export {buildVagasDisponiveisComponent, vagasCurtidas, updateLocalVagasCurtidas}