document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function (event) {
        const isFormValid = validateLoginForm();
        
        if (!isFormValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});

function validateLoginForm() {
    return validateLoginPassword() && validateLoginUsername();
}

function validateLoginUsername() {
    var username = document.getElementById("loginUsername").value.trim();
    var usernameError = document.getElementById("loginUsernameError");
    if (username === "") {
        usernameError.textContent = "Please enter your username.";
        return false;
    } else {
        usernameError.textContent = "";
        return true;
    }
}

function validateLoginPassword(password, errorElement) {
    var password = document.getElementById("loginPassword").value.trim();
    var passwordError = document.getElementById("loginPasswordError");
    if (password === "") {
        passwordError.textContent = "Please enter your password.";
        return false;
    } else {
        passwordError.textContent = "";
        return true;
    }
}