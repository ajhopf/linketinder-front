import Endereco from "./Endereco";
import Competencia from "./Competencia";

export default interface Usuario {
    id: number;
    nome: string;
    email: string;
    descricao: string;
    endereco: Endereco;
    competencias: Competencia[];

}