import {validateDescricaoAndTitulo} from "../../../../utils/form-validations/descricao-titulo";
import {getCurrentUser} from "../../../../service/user-service";
import {criarVagaValidationErrors} from "./new-vaga-form";
import {competenciasExigidasParaVaga} from "./new-vaga-form";


const handleTituloAndDescricaoBlur = (type: 'titulo' | 'descricao') => {
    const currentUser = getCurrentUser();
    const input = <HTMLInputElement> document.getElementById(type);
    const error = <HTMLElement> document.getElementById(`${type}-error-message`)

    try {
        validateDescricaoAndTitulo(currentUser.nome, input.value);

        if (!error.hasAttribute('hidden')) {
            error.setAttribute('hidden', 'true');
        }

        criarVagaValidationErrors[type] = false;

    } catch (e: any) {
        error.removeAttribute('hidden');
        error.innerText = e.message;
        criarVagaValidationErrors[type] = true;
    }
}

export {handleTituloAndDescricaoBlur, competenciasExigidasParaVaga}
