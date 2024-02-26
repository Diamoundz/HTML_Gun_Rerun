document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleRegisterBtn = document.getElementById('toggleRegisterBtn');
    const toggleLoginBtn = document.getElementById('toggleLoginBtn');

    toggleRegisterBtn.addEventListener('click', function () {
        loginForm.style.transition = 'transform 0.3s ease-in-out';
        registerForm.style.transition = 'transform 0.3s ease-in-out';

        loginForm.style.transform = 'translateX(-500%)';
        registerForm.style.transform = 'translateX(0)';

        setTimeout(function() {
            loginForm.style.display = 'none';
            registerForm.style.display = 'flex';
        }, 200);
    });

    toggleLoginBtn.addEventListener('click', function () {
        loginForm.style.transition = 'transform 0.3s ease-in-out';
        registerForm.style.transition = 'transform 0.3s ease-in-out';

        loginForm.style.transform = 'translateX(0)';
        registerForm.style.transform = 'translateX(500%)';

        setTimeout(function() {
            loginForm.style.display = 'flex';
            registerForm.style.display = 'none';
        }, 200);
    });
});