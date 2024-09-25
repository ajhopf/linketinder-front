import * as candidatosList from '../lib/candidatos.json';
import * as empresasList from '../lib/empresas.json';
import * as vagasList from '../lib/vagas.json';

import Candidato from "../model/Candidato";
import Competencia from "../model/Competencia";
import Endereco from "../model/Endereco";
import {registerUser} from "../service/user-service";
import Empresa from "../model/Empresa";
import {Vaga} from "../model/Vaga";
import {createVaga} from "../service/vagas-service";

const createCandidatos = () => {
   const candidatos = candidatosList.candidatos;

   candidatos.forEach(candidato => {
       const competencias = candidato.competencias as unknown as Competencia[];
       const endereco = candidato.endereco as unknown as Endereco;


        const newCandidato: Candidato = {
            nome: candidato.nome,
            competencias: competencias,
            id: candidato.id,
            descricao: candidato.descricao,
            endereco: endereco,
            email: candidato.email,
            senha: candidato.senha,
            cpf: candidato.cpf,
            idade: candidato.idade,
            linkedin: "linkedin.com/in/andre.jhopf",
            telefone: "(48) 99903-0950"
        }

        registerUser(newCandidato, 'candidato');
   })
}

const createEmpresas = () => {
    const empresas = empresasList.empresas;

    empresas.forEach(empresa => {
        const competencias = empresa.competencias as unknown as Competencia[];
        const endereco = empresa.endereco as unknown as Endereco;


        const newCandidato: Empresa = {
            nome: empresa.nome,
            competencias: competencias,
            id: empresa.id,
            descricao: empresa.descricao,
            endereco: endereco,
            email: empresa.email,
            senha: empresa.senha,
            cnpj: empresa.cnpj
        }

        registerUser(newCandidato, 'empresa');
    })
}

const createVagas = () => {
    const vagas = vagasList.vagas;

    vagas.forEach(vaga => {
        const competencias = vaga.competencias as unknown as Competencia[];

        const newVaga: Vaga = {
            id: vaga.id,
            descricao: vaga.descricao,
            titulo: vaga.titulo,
            empresaId: vaga.empresaId,
            competencias: competencias
        }

        createVaga(newVaga);
    })
}

const populate = () => {
    localStorage.clear();

    createCandidatos();
    createEmpresas();
    createVagas();
}

export {populate};
