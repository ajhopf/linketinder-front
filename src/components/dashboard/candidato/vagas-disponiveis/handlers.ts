import {getCurrentUser} from "../../../../service/user-service";
import {addCurtida, removeCurtida} from "../../../../service/curtida-service";
import {CurtidaEmVaga} from "../../../../model/Curtida";

import {updateLocalVagasCurtidas, vagasCurtidas} from "./vagas-disponiveis";

const handleVagaCurtidaClick = () => {
    const curtidaBtn = <HTMLButtonElement> document.getElementById('modal-curtir-btn')
    const vagaId = curtidaBtn.getAttribute('data-item-id');

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

export {handleVagaCurtidaClick}
