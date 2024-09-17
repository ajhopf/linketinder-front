import {Usuario} from "./Usuario";

export default interface Candidato extends Usuario {
    cpf: string;
    idade: number;
}