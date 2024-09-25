import {Vaga} from "../../../model/Vaga";
import {getVagaById} from "../../../service/vagas-service";
import Candidato from "../../../model/Candidato";
import {getUserById} from "../../../service/user-service";
import {buildModalCard} from "./modal";
import {vagasCurtidas} from "../../dashboard/candidato/vagas-disponiveis/vagas-disponiveis";
import {candidatosCurtidos} from "../../dashboard/empresa/candidatos/candidatos";

const genericOpenAndPopulateModal = (event: MouseEvent, type: 'vaga' | 'candidato', handler: () => void) => {
    const modal = <HTMLDivElement> document.getElementById("modal-background");
    const modalCardContent = <HTMLDivElement> document.getElementById('modal-card-content')
    const body = <HTMLBodyElement> document.getElementById('dashboard-body')

    body.classList.add('no-scroll');
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');

    if (event.currentTarget) {
        const cardDiv = <HTMLDivElement> event.currentTarget;
        const itemId = cardDiv.id.split('-')[2]

        if (type === 'vaga') {
            const vaga: Vaga = getVagaById(Number(itemId))

            modalCardContent.innerHTML = buildModalCard(vaga, vagasCurtidas);
        } else {
            const candidato: Candidato = getUserById(Number(itemId), 'candidatos');

            modalCardContent.innerHTML = buildModalCard(candidato, candidatosCurtidos);
        }
        const curtidaBtn = document.getElementById('modal-curtir-btn');

        curtidaBtn?.addEventListener('click', handler);
    }
}

const genericCloseModal = () => {
    const modal = <HTMLDivElement> document.getElementById("modal-background");
    const body = <HTMLBodyElement> document.getElementById('dashboard-body');
    const modalCard = <HTMLDivElement> document.getElementById('modal-card');

    modalCard.remove();

    body.classList.remove('no-scroll');
    modal.classList.remove('show-modal');
    modal.classList.add('hide-modal');
}

export {genericCloseModal, genericOpenAndPopulateModal}