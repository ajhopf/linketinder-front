import {compareSync, genSaltSync, hashSync} from "bcrypt-ts";

const salt = genSaltSync(10);

const hashPassword = (password: string): string => {
    return  hashSync(password, salt);
}

const comparePassword = (password: string, storedPassword: string): boolean => {
    return compareSync(password, storedPassword);
}

export { hashPassword, comparePassword }