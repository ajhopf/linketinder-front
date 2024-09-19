import {Usuario, UsuarioLogado} from "../model/Usuario";
import Empresa from "../model/Empresa";
import Candidato from "../model/Candidato";
import {comparePassword, hashPassword} from "../utils/bcrypt";
import {WrongCredentialsError} from "../errors/wrong-credentials-error";
import {EmailInUseError} from "../errors/email-in-use-error";
import {UserNotFoundError} from "../errors/user-not-found-error";

const getCurrentUser = (): UsuarioLogado => {
    const userString = localStorage.getItem('loggedUser');

    if (userString) {
        return <UsuarioLogado> JSON.parse(userString);
    } else {
        throw new Error('User not found')
    }
}


const loginUser = (userEmail: string, userPassword: string, type: 'empresas' | 'candidatos'): UsuarioLogado => {
    const usersArrayString = localStorage.getItem(type);

    if (usersArrayString) {
        const usersArray = <Usuario[]> JSON.parse(usersArrayString);

        const user = usersArray.find(user => user.email === userEmail);

        if (user) {
            const isPasswordCorrect = comparePassword(userPassword, user.senha);

            if (isPasswordCorrect) {
                const loggedUserInformation: UsuarioLogado = {type: type ,...user}
                localStorage.setItem('loggedUser', JSON.stringify(loggedUserInformation));
                return loggedUserInformation;
            } else {
                throw new WrongCredentialsError('Senha incorreta')
            }
        } else {
            throw new WrongCredentialsError('Usuário não encontrado')
        }
    } else {
        throw new WrongCredentialsError('Usuário não encontrado')
    }
}

const registerUser = (user: Usuario, type: 'empresa' | 'candidato'): Usuario => {
    if (type === 'candidato') {
        return insertNewUser(user as Candidato, 'candidatos')
    } else {
        return insertNewUser(user as Empresa, 'empresas')
    }
}

const getUserById = <T extends Usuario>(id:number, localStorageKey: 'empresas' | 'candidatos'): T => {
    const usersString = localStorage.getItem(localStorageKey);
    let users: T[] = [];

    if (usersString) {
        users = JSON.parse(usersString);

        const user = users.find(user => user.id === id);

        if (user) {
            return user;
        } else {
            throw new UserNotFoundError('User not found')
        }
    } else {
        throw new UserNotFoundError('User not found')
    }
}

const getAllUsersByType =  <T extends Usuario>(localStorageKey: 'empresas' | 'candidatos'): T[] => {
    const usersString = localStorage.getItem(localStorageKey);
    let users: T[] = [];

    if (usersString) {
        users = JSON.parse(usersString);
    }

    return users;
}

const insertNewUser = <T extends Usuario>(newUser: T, localStorageKey: 'empresas' | 'candidatos'): T => {
    const currentUsersString = localStorage.getItem(localStorageKey);
    let nextId = 0;
    let users: T[] = []

    if (currentUsersString) {
        users = <T[]> JSON.parse(currentUsersString);

        if (users.find(user => user.email === newUser.email)) {
            throw new EmailInUseError('Email já cadastrado!')
        }

        users.forEach(user => {
            if (user.id >= nextId) {
                nextId = user.id + 1;
            }
        });
    }

    newUser.id = nextId;
    newUser.senha = hashPassword(newUser.senha);
    const usersUpdated: T[] = [...users, newUser];
    localStorage.setItem(localStorageKey, JSON.stringify(usersUpdated));

    return newUser;
}

export { loginUser, registerUser, getCurrentUser, getUserById, getAllUsersByType }