import {Vaga} from "../model/Vaga";
import {VagaNotFoundError} from "../errors/vaga-not-found-error";
import {removeAllCurtidasDeUmaVaga} from "./curtida-service";

const getAllVagas = (): Vaga[] => {
    const vagasString = localStorage.getItem("vagas");

    let vagas: Vaga[] = [];

    if (vagasString) {
        vagas = <Vaga[]> JSON.parse(vagasString);
    }

    return vagas;
}

const getVagaById = (vagaId: number): Vaga => {
    const vagasString = localStorage.getItem("vagas");

    if (vagasString) {
        const todasVagas = <Vaga[]> JSON.parse(vagasString);

        const vaga = todasVagas.find(vaga => vaga.id === vagaId);

        if (!vaga) {
            throw new VagaNotFoundError('Vaga não encontrada')
        }

        return vaga;
    } else {
        throw new VagaNotFoundError('Vaga não encontrada')
    }

}

const getVagasDaEmpresa = (empresaId: number): Vaga[] => {
    const vagasString = localStorage.getItem("vagas");

    const vagas: Vaga[] = [];

    if (vagasString) {
        const todasVagas = <Vaga[]> JSON.parse(vagasString);

        todasVagas.forEach(vaga => vaga.empresaId === empresaId && vagas.push(vaga));
    }

    return vagas;
}

const deleteVaga = (vagaId: number) => {
    const vagasString = localStorage.getItem("vagas");
    console.log('vaga id aqui', vagaId)

    if (vagasString) {
        const todasVagas = <Vaga[]> JSON.parse(vagasString);

        console.log('vagaId no deleteVaga', vagaId);

        const vagaIdx = todasVagas.findIndex(vaga => vaga.id === vagaId);

        todasVagas.splice(vagaIdx, 1);

        removeAllCurtidasDeUmaVaga(vagaId);

        localStorage.setItem("vagas", JSON.stringify(todasVagas));
    }

}

const createVaga = (newVaga: Vaga) => {
    const vagasString = localStorage.getItem('vagas');
    let nextId = 0;
    let vagas: Vaga[] = []

    if (vagasString) {
        vagas = <Vaga[]> JSON.parse(vagasString);

        vagas.forEach(vaga => {
            if (vaga.id >= nextId) {
                nextId = vaga.id + 1;
            }
        });
    }

    newVaga.id = nextId;

    const vagasUpdated: Vaga[] = [...vagas, newVaga];
    localStorage.setItem('vagas', JSON.stringify(vagasUpdated));

    return newVaga;
}

export {getAllVagas, getVagaById, createVaga, getVagasDaEmpresa, deleteVaga}