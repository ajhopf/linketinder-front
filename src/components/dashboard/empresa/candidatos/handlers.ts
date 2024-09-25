import {addCurtida, removeCurtida} from "../../../../service/curtida-service";
import {CurtidaEmCandidato} from "../../../../model/Curtida";
import {getCurrentUser} from "../../../../service/user-service";
import {candidatosCurtidos, updateLocalCurtidas} from "./candidatos";

const handleCandidatoCurtidaClick = () => {
    const curtidaBtn = <HTMLButtonElement> document.getElementById('modal-curtir-btn')
    const candidatoId = curtidaBtn.getAttribute('data-item-id');

    if (candidatoId) {
        const curtidaIdx = candidatosCurtidos.findIndex(curtida => curtida.candidatoId === Number(candidatoId));

        if (curtidaIdx >= 0) {
            const curtidaId = candidatosCurtidos[curtidaIdx].id;
            removeCurtida(curtidaId, 'candidatosCurtida')
            const curtidaIcones = <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName(`curtida-icone-${candidatoId}`)

            for (let i = 0; i < curtidaIcones.length; i++) {
                curtidaIcones[i].setAttribute('src', '/assets/fire.svg')
            }

            updateLocalCurtidas()
        } else {
            const curtida: CurtidaEmCandidato = {
                id: 0,
                empresaId: getCurrentUser().id,
                candidatoId: Number(candidatoId)
            }

            addCurtida<CurtidaEmCandidato>(curtida, 'candidatosCurtida');

            const curtidaIcones = <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName(`curtida-icone-${candidatoId}`)

            for (let i = 0; i < curtidaIcones.length; i++) {
                curtidaIcones[i].setAttribute('src', '/assets/fire-liked.svg')
            }

            updateLocalCurtidas()
        }
    }

}

export {handleCandidatoCurtidaClick}