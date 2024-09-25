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

const removeAllCurtidasDeUmaVaga = (vagaId: number) => {
    const curtidasString = localStorage.getItem('vagasCurtida');

    let curtidas: CurtidaEmVaga[] = [];

    if (curtidasString) {
        curtidas = <CurtidaEmVaga[]> JSON.parse(curtidasString);

        console.log('vaga id: ', vagaId);

        const curtidasFiltradas =  curtidas.filter(curtida => curtida.vagaId !== vagaId);

        console.log(curtidasFiltradas)

        localStorage.setItem('vagasCurtida', JSON.stringify(curtidasFiltradas));
    }
}

const addCurtida = <T extends Curtida> (newCurtida: T, storageKey: 'candidatosCurtida' | 'vagasCurtida') => {
    const curtidasString = localStorage.getItem(storageKey);

    let nextId = 0;
    let curtidas: T[] = [];

    if (curtidasString) {
        curtidas = <T[]> JSON.parse(curtidasString);

        curtidas.forEach(curtida => {
            if (curtida.id >= nextId) {
                nextId = curtida.id + 1;
            }
        })
    }

    newCurtida.id = nextId;
    const curtidasUpdated: T[] = [...curtidas, newCurtida];
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

export {addCurtida, removeCurtida, removeAllCurtidasDeUmaVaga, getCurtidasDoCurrentUser}