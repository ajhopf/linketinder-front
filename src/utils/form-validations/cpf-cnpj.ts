import {CpfCnpjError} from "../../errors/registration-form-errors/cpf-cnpj-error";

const validateAndFormatCpf = (cpf: string): string => {
    const onlyNumbersCpf = cpf.replace(/\D/g, '')

    if (!/^[0-9]{11}$/.test(onlyNumbersCpf)) {
        throw new CpfCnpjError('Cpf inválido')
    }

    return onlyNumbersCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

const validateAndFormatCnpj = (cnpj: string): string => {
    const onlyNumbersCnpj = cnpj.replace(/\D/g, '')

    if (!/^[0-9]{14}$/.test(onlyNumbersCnpj)) {
        throw new CpfCnpjError('Cnpj inválido')
    }

    return onlyNumbersCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}


export { validateAndFormatCpf, validateAndFormatCnpj }