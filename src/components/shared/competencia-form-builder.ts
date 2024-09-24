const competenciasInputBuilder = (registrationType: 'empresas' | 'candidatos'): string => {
    return `
    <div class="d-flex flex-column col-5">
        <div>
            <label for="competencia" class="form-label">Competencias</label>
            <input type="text" id="competencia" class="form-control mb-3">
        </div>
        <div>
            <div>
                <label for="experiencia-competencia" class="form-label">${registrationType === 'empresas' ? 'Anos de Experiência Exigido' : 'Anos de Experiência'}</label>
                <input type="number" step="0.5" id="experiencia-competencia" class="form-control mb-3" >
            </div>
            <div>
                <label>${registrationType === 'empresas' ? 'Importância para a Vaga (1 a 5)' : 'Nível de Afinidade (1 a 5)'}</label>
                <input value="1" type="number" min="1" max="5" step="1" id="importancia-competencia" class="form-control mb-3">    
            </div>
        </div>
        <button type="button" id="competencia-btn" class="btn btn-outline-primary">Adicionar Competencia</button>
    </div>
    <div class="text-center col-5">
        <p class="mb-2">Lista de Competências Adicionadas</p>
        <small>Clique em uma competência para removê-la da lista</small>
        <ul id="competencias-list" class="list-group text-center">
            
        </ul>
    </div>
    
    `
}

export {competenciasInputBuilder}