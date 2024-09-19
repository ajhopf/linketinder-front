import {Curtida, CurtidaEmCandidato, CurtidaEmVaga} from "../model/Curtida";
import {UsuarioLogado} from "../model/Usuario";
import {CurtidaNotFoundError} from "../errors/curtida-not-found-error";

const getCurtidasDoCurrentUser = (currentLoggedUser: UsuarioLogado) => {
    let storageKey = 'vagasCurtida';

    if (currentLoggedUser.type === 'empresas') {
        storageKey = 'candidatosCurtida';
    }

    const allCurtidasString = localStorage.getItem(storageKey);

    let curtidasDoUsuario: Curtida[] = [];

    if (allCurtidasString) {
        if (currentLoggedUser.type === 'empresas') {
            const curtidas: CurtidaEmCandidato[] = JSON.parse(allCurtidasString);
            curtidasDoUsuario = curtidas.filter(curtida => curtida.empresaId === currentLoggedUser.id)
        } else {
            const curtidas: CurtidaEmVaga[] = JSON.parse(allCurtidasString);
            curtidasDoUsuario = curtidas.filter(curtida => curtida.candidatoId === currentLoggedUser.id)
        }
    }

    return curtidasDoUsuario;
}


const addCurtida = <T extends Curtida> (newCurtida: T, storageKey: 'candidatosCurtida' | 'vagasCurtida') => {
    const curtidasString = localStorage.getItem(storageKey);

    let nextId = 0;
    let curtidas: Curtida[] = [];

    if (curtidasString) {
        curtidas = <Curtida[]> JSON.parse(curtidasString);

        curtidas.forEach(curtida => {
            if (curtida.id >= nextId) {
                nextId = curtida.id + 1;
            }
        })
    }

    newCurtida.id = nextId;
    const curtidasUpdated: Curtida[] = [...curtidas, newCurtida];
    localStorage.setItem(storageKey, JSON.stringify(curtidasUpdated));

    return newCurtida;
}

const removeCurtida = (curtidaId: number, storageKey: 'candidatosCurtida' | 'vagasCurtida') => {
    const curtidasString = localStorage.getItem(storageKey);

    if (curtidasString) {
        const curtidas = <Curtida[]> JSON.parse(curtidasString);
        const curtidaIdx = curtidas.findIndex(curtida => curtida.id === curtidaId)

        if (curtidaIdx >= 0) {
            curtidas.splice(curtidaIdx, 1);

            localStorage.setItem(storageKey, JSON.stringify(curtidas));
        } else {
            throw new CurtidaNotFoundError('Curtida não encontrada');
        }

    } else {
        throw new CurtidaNotFoundError('Curtida não encontrada');
    }
}

const removeCurtidaDoCandidato = (curtidaId: number) => {
    const candidatosCurtidasString = localStorage.getItem("candidatosCurtida");

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

export {addCurtida, removeCurtida, getCurtidasDoCurrentUser, removeCurtidaDoCandidato}