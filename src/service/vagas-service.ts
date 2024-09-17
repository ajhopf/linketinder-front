import {Vaga} from "../model/Vaga";

const getVagasDaEmpresa = (empresaId: number): Vaga[] => {
    const vagasString = localStorage.getItem("vagas");

    const vagas: Vaga[] = [];

    if (vagasString) {
        const todasVagas = <Vaga[]> JSON.parse(vagasString);

        todasVagas.forEach(vaga => vaga.empresaId === empresaId && vagas.push(vaga));
    }

    return vagas;
}

const removeVaga = (vagaId: number) => {
    const vagasString = localStorage.getItem("vagas");

    if (vagasString) {
        const todasVagas = <Vaga[]> JSON.parse(vagasString);

        const vagaIdx = todasVagas.findIndex(vaga => vaga.id === vagaId);

        todasVagas.splice(vagaIdx, 1);

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

export {createVaga, getVagasDaEmpresa, removeVaga}