import Competencia from "../../../../model/Competencia";
import {genericHandleAddCompetencia} from "../../../shared/competencia-handlers";

const competenciasExigidasParaVaga: Competencia[] = [];

const handleAddCompetencia = () => {
    genericHandleAddCompetencia(competenciasExigidasParaVaga);
}

export {handleAddCompetencia, competenciasExigidasParaVaga}
