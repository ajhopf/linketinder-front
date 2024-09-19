import {CpfCnpjError} from "../errors/cpf-cnpj-error";

const formatCpf = (cpf: string): string => {
    const onlyNumbersCpf = cpf.replace(/\D/g, '')

    if (onlyNumbersCpf.length !== 11) {
        throw new CpfCnpjError('Cpf inválido')
    }

    return onlyNumbersCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

const formatCnpj = (cnpj: string): string => {
    const onlyNumbersCnpj = cnpj.replace(/\D/g, '')

    if (onlyNumbersCnpj.length !== 14) {
        throw new CpfCnpjError('Cnpj inválido')
    }

    return onlyNumbersCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
}


export { formatCpf, formatCnpj }