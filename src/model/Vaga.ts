import Competencia from "./Competencia";

export interface Vaga {
    id: number;
    titulo: string;
    descricao: string;
    competencias: Competencia[];
    empresaId: number;
}