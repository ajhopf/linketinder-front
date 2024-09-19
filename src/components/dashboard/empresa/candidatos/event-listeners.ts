import {closeModal, handleMouseOverCard} from "./handlers";

const addCandidatosCardsEventListeners = () => {
    const cards = <HTMLCollectionOf<HTMLDivElement>> document.getElementsByClassName('candidato-card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        card.addEventListener('mouseover', handleMouseOverCard);
    }

    const closeModalBtn = <HTMLButtonElement> document.getElementById('close-candidato-modal-btn');
    const modalBackground = <HTMLDivElement> document.getElementById('candidato-modal')
    const modalCardContainer = <HTMLDivElement> document.getElementById('modal-card-container');

    closeModalBtn.addEventListener('click', closeModal);
    modalBackground.addEventListener('click', closeModal);
    modalCardContainer.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click from reaching the parent div
    });
}

const removeCandidatosCardsEventListeners = () => {
    const cards = <HTMLCollectionOf<HTMLDivElement>> document.getElementsByClassName('candidato-card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.removeEventListener('mouseover', handleMouseOverCard);
    }
}


export {addCandidatosCardsEventListeners, removeCandidatosCardsEventListeners}