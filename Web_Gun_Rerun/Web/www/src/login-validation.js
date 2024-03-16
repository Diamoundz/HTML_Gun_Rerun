document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    var errorMessage = document.getElementById("confirmError");
    var successMessage = document.getElementById("confirmSuccess");

    form.addEventListener('submit', function (event) {
        const isFormValid = validateLoginForm();

        if (!isFormValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        } else {


            const username = document.getElementById("loginUsername").value.trim();
            const password = document.getElementById("loginPassword").value.trim();
            
            const xhr = new XMLHttpRequest();
            const url = '../htbin/login.py';

            const data = new FormData();
            data.append('username', username);
            data.append('userpwd', password);

            console.log(username);

            xhr.open('POST', url, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if(xhr.responseText[0] ==='B'){
                        successMessage.textContent = xhr.responseText;
                    }
                    else{
                        errorMessage.textContent = xhr.responseText;
                    }

                }
            };

            xhr.send(data);
            
            event.preventDefault();
        }
    });
});

function validateLoginForm() {
    const isUsernameValid = validateLoginUsername();
    const isPasswordValid = validateLoginPassword();

    return isUsernameValid && isPasswordValid;
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

function validateLoginPassword() {
    const password = document.getElementById("loginPassword").value.trim();
    const passwordError = document.getElementById("loginPasswordError");

    if (password === "") {
        passwordError.textContent = "Please enter your password.";
        return false;
    } else {
        passwordError.textContent = "";
        return true;
    }
}
