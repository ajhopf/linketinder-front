import Usuario from "../model/Usuario";
import Empresa from "../model/Empresa";
import Candidato from "../model/Candidato";
import {comparePassword, hashPassword} from "./bcrypt";

const loginUser = (userEmail: string, userPassword: string, type: 'empresas' | 'candidatos') => {
    const usersArrayString = localStorage.getItem(type);
    if (usersArrayString) {
        const usersArray = <Usuario[]> JSON.parse(usersArrayString);

        const user = usersArray.find(user => user.email === userEmail);

        if (user) {
            const isPasswordCorrect = comparePassword(userPassword, user.senha);

            if (isPasswordCorrect) {
               localStorage.setItem('loggedUser', JSON.stringify(user));
               window.location.assign('dashboard.html');
            }
        }
    }

}

const registerUser = (user: Usuario, type: 'empresa' | 'candidato') => {
    if (type === 'candidato') {
        insertNewItem(user as Candidato, 'candidatos')
    } else {
        insertNewItem(user as Empresa, 'empresas')
    }
}

const insertNewItem = <T extends Usuario>(newUser: T, localStorageKey: 'empresas' | 'candidatos') => {
    const currentUsersString = localStorage.getItem(localStorageKey);
    let nextId = 0;
    let users: T[] = []

    if (currentUsersString) {
        users = <T[]> JSON.parse(currentUsersString);

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
}

export { loginUser, registerUser }