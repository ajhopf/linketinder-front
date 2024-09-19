const buildProfileFormInnerContent = () => {
    return `<h1>Ainda estamos trabalhando nesta funcionalidade! Em breve você poderá editar suas informações</h1>`
}

const buildProfileComponent = () => {
    const mainContainer = <HTMLDivElement> document.getElementById('main-container');

    mainContainer.innerHTML = buildProfileFormInnerContent();
}

export { buildProfileComponent }