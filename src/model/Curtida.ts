interface Curtida {
    id: number;
    candidatoId: number;
}

interface CurtidaEmCandidato extends Curtida {
    empresaId: number;
}

interface CurtidaEmVaga extends Curtida {
    vagaId: number;
}

export { CurtidaEmCandidato, CurtidaEmVaga, Curtida }