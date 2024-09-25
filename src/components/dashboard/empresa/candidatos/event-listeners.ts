import { handleCandidatoCurtidaClick} from "./handlers";
import { genericOpenAndPopulateModal } from "../../../shared/modal/modal-handlers";
import {Popover} from "bootstrap";
import {getUserById} from "../../../../service/user-service";

import {buildCompetenciaListForTooltip} from "../../../shared/card/card";

const addCandidatosCardsEventListeners = () => {
    const cards = <HTMLCollectionOf<HTMLDivElement>> document.getElementsByClassName('item-card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const candidatoId = card.id.split('-')[2];

        const candidato = getUserById(Number(candidatoId), 'candidatos');

        card.addEventListener('click', (event) => genericOpenAndPopulateModal(event, 'candidato', handleCandidatoCurtidaClick));

        new Popover(card, {
            trigger: 'hover',
            content: buildCompetenciaListForTooltip(candidato.competencias),
            html: true
        })
    }
}

export {addCandidatosCardsEventListeners}