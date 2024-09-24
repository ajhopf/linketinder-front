import {genericOpenAndPopulateModal} from "../../../shared/modal/modal-handlers";
import { handleVagaCurtidaClick } from "./handlers";
import {Popover} from "bootstrap";
import {buildCompetenciaListForTooltip} from "../../../shared/card/card";
import { getVagaById} from "../../../../service/vagas-service";

const addVagasCardsEventListeners = () => {
    const cards = <HTMLCollectionOf<HTMLDivElement>> document.getElementsByClassName('item-card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const vagaId = card.id.split('-')[2];

        card.addEventListener('click', (event) => genericOpenAndPopulateModal(event, 'vaga', handleVagaCurtidaClick));

        const vaga = getVagaById(Number(vagaId));

        new Popover(card, {
            trigger: 'hover',
            content: buildCompetenciaListForTooltip(vaga.competencias),
            html: true
        })
    }
}


export {addVagasCardsEventListeners}