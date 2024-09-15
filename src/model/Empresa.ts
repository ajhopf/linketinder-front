import Usuario from "./Usuario";

export default interface Empresa extends Usuario {
    cnpj: string;
}