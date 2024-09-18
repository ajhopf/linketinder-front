import {addCurtidaACandidato, removeCurtidaDoCandidato} from "../../../service/curtida-service";
import Curtida from "../../../model/Curtida";
import {getCurrentUser, getUserById} from "../../../service/user-service";
import {candidatosCurtidos, updateLocalCurtidas} from "./candidatos";
import Candidato from "../../../model/Candidato";
import {buildCandidatoModalCard} from "./modal";

const handleMouseOverCard = (event: MouseEvent) => {
    const modal = <HTMLDivElement> document.getElementById("candidato-modal");
    const modalCardContent = <HTMLDivElement> document.getElementById('modal-card-content')
    const body = <HTMLBodyElement> document.getElementById('dashboard-body')
    const curtidaBtn = document.getElementById('curtir-candidato')

    if (curtidaBtn) {
        curtidaBtn.removeEventListener('click', handleCurtidaClick);
    }

    body.classList.add('no-scroll');
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');

    if (event.currentTarget) {
        const candidatoDiv = <HTMLDivElement> event.currentTarget;
        const candidatoId = candidatoDiv.id.split('-')[2]

        const candidato: Candidato = getUserById(Number(candidatoId), 'candidatos')

        modalCardContent.innerHTML = buildCandidatoModalCard(candidato);

        const curtidaBtn = document.getElementById('curtir-candidato')
        curtidaBtn?.addEventListener('click', handleCurtidaClick);
    }
}

const closeModal = () => {
    const modal = <HTMLDivElement> document.getElementById("candidato-modal");
    const body = <HTMLBodyElement> document.getElementById('dashboard-body')

    body.classList.remove('no-scroll');
    modal.classList.remove('show-modal');
    modal.classList.add('hide-modal');
}

const handleCurtidaClick = () => {
    const curtidaBtn = <HTMLButtonElement> document.getElementById('curtir-candidato')
    const candidatoId = curtidaBtn.getAttribute('data-candidato-id');

    console.log(curtidaBtn)
    console.log(candidatoId)

    if (candidatoId) {
        const curtidaIdx = candidatosCurtidos.findIndex(curtida => curtida.candidatoId === Number(candidatoId));

        if (curtidaIdx >= 0) {
            const curtidaId = candidatosCurtidos[curtidaIdx].id;
            removeCurtidaDoCandidato(curtidaId)
            const curtidaIcones = <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName(`curtida-icone-${candidatoId}`)

            for (let i = 0; i < curtidaIcones.length; i++) {
                curtidaIcones[i].setAttribute('src', '/assets/fire.svg')
            }

            updateLocalCurtidas()
        } else {
            const curtida: Curtida = {
                id: 0,
                empresaId: getCurrentUser().id,
                candidatoId: Number(candidatoId)
            }
            addCurtidaACandidato(curtida)

            const curtidaIcones = <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName(`curtida-icone-${candidatoId}`)

            for (let i = 0; i < curtidaIcones.length; i++) {
                curtidaIcones[i].setAttribute('src', '/assets/fire-liked.svg')
            }

            updateLocalCurtidas()
        }
    }

}



const addCurtirCandidatoClickHandlers = () => {
    const curtirButtons = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName('curtir-candidato-buttons');

    for (let i = 0; i < curtirButtons.length; i++) {
        const curtirButton = curtirButtons[i];
        console.log(curtirButton)
        const candidatoId = curtirButton.id.split('-')[2];

        curtirButton.addEventListener('click', () => {
            const curtidaIdx = candidatosCurtidos.findIndex(curtida => curtida.candidatoId === Number(candidatoId));
            if (curtidaIdx >= 0) {
                const curtidaId = candidatosCurtidos[curtidaIdx].id;
                removeCurtidaDoCandidato(curtidaId)
                const curtidaIcone = <HTMLImageElement> document.getElementById(`candidato-icone-${candidatoId}`)
                curtidaIcone.setAttribute('src', '/assets/fire.svg')
                updateLocalCurtidas()
            } else {
                const curtida: Curtida = {
                    id: 0,
                    empresaId: getCurrentUser().id,
                    candidatoId: Number(candidatoId)
                }
                addCurtidaACandidato(curtida)
                const curtidaIcone = <HTMLImageElement> document.getElementById(`candidato-icone-${candidatoId}`)
                curtidaIcone.setAttribute('src', '/assets/fire-liked.svg')
                updateLocalCurtidas()
            }
        })
    }
}



export {handleMouseOverCard, addCurtirCandidatoClickHandlers, closeModal, handleCurtidaClick}