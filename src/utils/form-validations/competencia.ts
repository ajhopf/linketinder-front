import {allCompetencias} from "../../lib/competencias-list";

const validateCompetencia = (competencia: string) => {
    if (!allCompetencias.includes(competencia)) {
        const regex = new RegExp(competencia, 'i');

        const voceQuisDizerIsso = allCompetencias.find(competencia => regex.test(competencia));

        throw new Error(`${competencia}, não é uma competência válida. ${voceQuisDizerIsso ? "Você quis dizer: " + voceQuisDizerIsso + "?" : ''}`);
    }
}



export {validateCompetencia};