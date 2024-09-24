import {genericOpenAndPopulateModal} from "../../../shared/modal/modal-handlers";
import { handleVagaCurtidaClick } from "./handlers";

const addVagasCardsEventListeners = () => {
    const cards = <HTMLCollectionOf<HTMLDivElement>> document.getElementsByClassName('item-card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        card.addEventListener('mouseover', (event) => genericOpenAndPopulateModal(event, 'vaga', handleVagaCurtidaClick));
    }
}

export {addVagasCardsEventListeners}