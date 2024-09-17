import Endereco from "./Endereco";
import Competencia from "./Competencia";

export interface Usuario {
    id: number;
    nome: string;
    senha: string;
    email: string;
    descricao: string;
    endereco: Endereco;
    competencias: Competencia[];
}

export interface UsuarioLogado extends Usuario {
    type: 'empresas' | 'candidatos'
}

