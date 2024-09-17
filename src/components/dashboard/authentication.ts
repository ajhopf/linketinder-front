import {UsuarioLogado} from "../../model/Usuario";

let user: UsuarioLogado;

const checkLoggedUser = () => {
    const loggedUser = localStorage.getItem('loggedUser');

    if (!loggedUser) {
        window.location.assign('/');
        return;
    }

    user = <UsuarioLogado> JSON.parse(loggedUser);

    const navHello = <HTMLParagraphElement> document.getElementById("nav-hello");
    navHello.innerText = `Olá, ${user.nome}`;
}

const logoutUser = () => {
    localStorage.removeItem('loggedUser');
    checkLoggedUser();
}

export {checkLoggedUser, logoutUser}