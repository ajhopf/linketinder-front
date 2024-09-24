import { handleCandidatoCurtidaClick} from "./handlers";
import { genericOpenAndPopulateModal } from "../../../shared/modal/modal-handlers";

const addCandidatosCardsEventListeners = () => {
    const cards = <HTMLCollectionOf<HTMLDivElement>> document.getElementsByClassName('item-card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        card.addEventListener('mouseover', (event) => genericOpenAndPopulateModal(event, 'candidato', handleCandidatoCurtidaClick));
    }
}

export {addCandidatosCardsEventListeners}