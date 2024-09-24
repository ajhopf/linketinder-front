
import {getCurrentUser} from "../../../../service/user-service";
import {addCurtida, removeCurtida} from "../../../../service/curtida-service";
import {CurtidaEmVaga} from "../../../../model/Curtida";
import {buildVagaModalCard} from "./vaga-modal";
import {Vaga} from "../../../../model/Vaga";
import {getVagaById} from "../../../../service/vagas-service";
import {updateLocalVagasCurtidas, vagasCurtidas} from "./vagas-disponiveis";

const handleMouseOverVagaCard = (event: MouseEvent) => {
    const modal = <HTMLDivElement> document.getElementById("candidato-modal");
    const modalCardContent = <HTMLDivElement> document.getElementById('modal-card-content')
    const body = <HTMLBodyElement> document.getElementById('dashboard-body')
    const curtidaBtn = document.getElementById('curtir-vaga')

    if (curtidaBtn) {
        curtidaBtn.removeEventListener('click', handleCurtidaClick);
    }

    body.classList.add('no-scroll');
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');

    if (event.currentTarget) {
        const vagaDiv = <HTMLDivElement> event.currentTarget;
        console.log(vagaDiv);
        const vagaId = vagaDiv.id.split('-')[2]

        const vaga: Vaga = getVagaById(Number(vagaId))

        modalCardContent.innerHTML = buildVagaModalCard(vaga);

        const curtidaBtn = document.getElementById('curtir-vaga')
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
    const curtidaBtn = <HTMLButtonElement> document.getElementById('curtir-vaga')
    const vagaId = curtidaBtn.getAttribute('data-vaga-id');

    if (vagaId) {
        const curtidaIdx = vagasCurtidas.findIndex(curtida => curtida.vagaId === Number(vagaId));

        if (curtidaIdx >= 0) {
            const curtidaId = vagasCurtidas[curtidaIdx].id;
            removeCurtida(curtidaId, 'vagasCurtida');
            const curtidaIcones = <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName(`curtida-icone-${vagaId}`)

            for (let i = 0; i < curtidaIcones.length; i++) {
                curtidaIcones[i].setAttribute('src', '/assets/fire.svg')
            }

            updateLocalVagasCurtidas()
        } else {
            const curtida: CurtidaEmVaga = {
                id: 0,
                vagaId: Number(vagaId),
                candidatoId: getCurrentUser().id
            }
            addCurtida<CurtidaEmVaga>(curtida, 'vagasCurtida');

            const curtidaIcones = <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName(`curtida-icone-${vagaId}`)

            for (let i = 0; i < curtidaIcones.length; i++) {
                curtidaIcones[i].setAttribute('src', '/assets/fire-liked.svg')
            }

            updateLocalVagasCurtidas()
        }
    }

}

export {handleMouseOverVagaCard}
