document.addEventListener('DOMContentLoaded', () => {
    // Alternar visibilidade da senha
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePassword.querySelector('i').classList.toggle('fa-eye');
            togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Validação do formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Aqui você pode adicionar a lógica para autenticação (ex.: chamada a uma API)
            console.log('Login submetido:', { email, password });
            alert('Login bem-sucedido! (Funcionalidade de autenticação não implementada)');
        });
    }

    // Reutilizar lógica do menu hambúrguer
    const hamburger = document.querySelector('.hamburguer');
    const nav = document.querySelector('.nav');
    const navList = document.querySelector('.nav-list');

    if (hamburger && nav && navList) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'nav-list');

        hamburger.addEventListener('click', () => {
            const isExpanded = nav.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        navList.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                nav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});