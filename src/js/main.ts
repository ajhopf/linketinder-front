const loginForm = document.getElementById('login-form')!;

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log(e.target)
})

