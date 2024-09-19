import {UsuarioLogado} from "../../model/Usuario";

let user: UsuarioLogado;

const hideInformationBasedOnLoggedUserType = (usuarioLogado: UsuarioLogado) => {
    if (usuarioLogado.type === 'candidatos') {
        const empresaNavLinks = <HTMLCollectionOf<HTMLLIElement>> document.getElementsByClassName('empresa-nav-link');

        for (let i = empresaNavLinks.length - 1; i >= 0; i--) {
            empresaNavLinks[i].remove();
        }
    }

    if (usuarioLogado.type === 'empresas') {
        const candidatoNavLink = <HTMLCollectionOf<HTMLLIElement>> document.getElementsByClassName('candidato-nav-link');

        for (let i = candidatoNavLink.length - 1; i >= 0; i--) {
            candidatoNavLink[i].remove();
        }
    }
}

const checkLoggedUser = () => {
    const loggedUser = localStorage.getItem('loggedUser');

    if (!loggedUser) {
        window.location.assign('/');
        return;
    }

    user = <UsuarioLogado> JSON.parse(loggedUser);

    hideInformationBasedOnLoggedUserType(user);

    const navHello = <HTMLParagraphElement> document.getElementById("nav-hello");
    navHello.innerText = `Olá, ${user.nome}`;
}

const logoutUser = () => {
    localStorage.removeItem('loggedUser');
    checkLoggedUser();
}

export {checkLoggedUser, logoutUser}