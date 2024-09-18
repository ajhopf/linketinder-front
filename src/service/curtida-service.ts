import Curtida from "../model/Curtida";
import {UsuarioLogado} from "../model/Usuario";
import {CurtidaNotFoundError} from "../errors/curtida-not-found-error";

const getCurtidasDoCurrentUser = (currentLoggedUser: UsuarioLogado) => {
    let storageKey = 'empresasCurtida';

    if (currentLoggedUser.type === 'empresas') {
        storageKey = 'candidatosCurtida';
    }

    const allCurtidasString = localStorage.getItem(storageKey);

    let curtidasDoUsuario: Curtida[] = [];

    if (allCurtidasString) {
        const curtidas: Curtida[] = JSON.parse(allCurtidasString);

        if (currentLoggedUser.type === 'empresas') {
            curtidasDoUsuario = curtidas.filter(curtida => curtida.empresaId === currentLoggedUser.id)
        } else {
            curtidasDoUsuario = curtidas.filter(curtida => curtida.candidatoId === currentLoggedUser.id)
        }
    }

    return curtidasDoUsuario;
}

const addCurtidaACandidato = (newCurtida: Curtida) => {
    const candidatosCurtidasString = localStorage.getItem("candidatosCurtida");
    let nextId = 0;
    let curtidas: Curtida[] = [];

    if (candidatosCurtidasString) {
        curtidas = <Curtida[]> JSON.parse(candidatosCurtidasString);

        curtidas.forEach(curtida => {
            if (curtida.id >= nextId) {
                nextId = curtida.id + 1;
            }
        })
    }

    newCurtida.id = nextId;
    const curtidasUpdated: Curtida[] = [...curtidas, newCurtida];
    localStorage.setItem('candidatosCurtida', JSON.stringify(curtidasUpdated));

    return newCurtida;
}

const removeCurtidaDoCandidato = (curtidaId: number) => {
    const candidatosCurtidasString = localStorage.getItem("candidatosCurtida");
    console.log('Curtidas string', candidatosCurtidasString);

    if (candidatosCurtidasString) {
        const curtidas = <Curtida[]> JSON.parse(candidatosCurtidasString);
        const curtidaIdx = curtidas.findIndex(curtida => curtida.id === curtidaId)
        console.log('Curtida Idx', curtidaIdx)
        console.log('Curtidas', curtidas[0])
        if (curtidaIdx >= 0) {
            curtidas.splice(curtidaIdx, 1);
            console.log(curtidas)
            localStorage.setItem("candidatosCurtida", JSON.stringify(curtidas));
        } else {
            throw new CurtidaNotFoundError('Curtida não encontrada');
        }

    } else {
        throw new CurtidaNotFoundError('Curtida não encontrada');
    }
}

export {addCurtidaACandidato, getCurtidasDoCurrentUser, removeCurtidaDoCandidato}