import {LinkedinInvalidError} from "../../errors/registration-form-errors/linkedin-invalid-error";

const validateLinkedin = (linkedin: string) => {
    // https://www.linkedin.com/in/danielcostadev/
    const pattern = /^(https:\/\/)?(www\.)?linkedin\.com\/in\/\w+$/

    if (!pattern.test(linkedin)) {
        throw new LinkedinInvalidError('O link do linkedin deve estar no seguinte formato: linkedin.com/in/seu-perfil')
    }

    console.log(pattern.test(linkedin));
}

export {validateLinkedin}