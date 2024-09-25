import * as competenciasList from './competencias.json'

const competencias = competenciasList.competencias;

const languages = competencias.find(category => category.category === "Programming Languages")!.tags;
const frontEnd = competencias.find(category => category.category === "Frontend Technologies")!.tags;
const backEnd = competencias.find(category => category.category === "Backend Technologies")!.tags;
const databases = competencias.find(category => category.category === "Databases")!.tags;
const cloud = competencias.find(category => category.category === "Cloud Platforms")!.tags;
const other = competencias.find(category => category.category === "Other")!.tags;

const allCompetencias = [...languages, ...frontEnd, ...backEnd, ...databases, ...cloud, ...other];

export { allCompetencias }