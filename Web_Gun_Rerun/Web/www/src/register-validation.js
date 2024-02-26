
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');

    form.addEventListener('submit', function (event) {
        const isFormValid = validateRegistrationForm();
        
        if (!isFormValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});
function validateRegistrationForm() {
    const registerConfirm = document.getElementById('registerConfirm');
    // Validate each field and return true if all fields are valid, otherwise return false
    var isvalid = true;
    isvalid = validateFirstName() && isvalid;
    isvalid = validateLastName() && isvalid;
    isvalid = validateDate() && isvalid;
    isvalid = validateUsername() && isvalid;
    isvalid = validatePassword() && isvalid;
    isvalid = validateEmail() && isvalid;

    if(isvalid){
        registerConfirm.textContent = "Succesfully registered !"
    }
    return (
        isvalid
    );
}

function validateFirstName() {
    var firstName = document.getElementById("firstName").value.trim();
    var firstNameError = document.getElementById("firstNameError");

    if (firstName === "") {
        firstNameError.textContent = "Please enter your first name.";
        return false;
    } else {
        firstNameError.textContent = "";
        return true;
    }
}

function validateLastName() {
    var lastName = document.getElementById("lastName").value.trim();
    var lastNameError = document.getElementById("lastNameError");

    if (lastName === "") {
        lastNameError.textContent = "Please enter your last name.";
        return false;
    } else {
        lastNameError.textContent = "";
        return true;
    }
}

function validateDate() {
    var dob = document.getElementById("dob").value.trim();
    var dobError = document.getElementById("dobError");

    // Check if the date is in the format dd/mm/yyyy using a regular expression
    var dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!dateRegex.test(dob) || dob === "") {
        // If the date is not in the correct format or is empty, display an error message
        dobError.textContent = "Date format invalid (dd/mm/yyyy).";
        return false;
    }

    // Split the date into day, month, and year
    var dateParts = dob.split('/');
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10);
    var year = parseInt(dateParts[2], 10);

    // Check if the month is valid (between 1 and 12)
    if (month < 1 || month > 12) {
        dobError.textContent = "Please enter a valid date.";
        return false;
    }

    // Check if the day is valid for the given month
    var daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        dobError.textContent = "Please enter a valid date.";
        return false;
    }

    // Check if the date is in the past
    var currentDate = new Date();
    if (new Date(year, month - 1, day) > currentDate) {
        dobError.textContent = "Please enter a valid date.";
        return false;
    }

    // If all checks pass, clear the error message
    dobError.textContent = "";
    return true;
}

function validateUsername() {
    var username = document.getElementById("registerUsername").value.trim();
    var usernameError = document.getElementById("usernameError");

    if (username.length < 6) {
        usernameError.textContent = "Please enter a valid username.";
        return false;
    } else {
        usernameError.textContent = "";
        return true;
    }
}

function validatePassword() {
    var password = document.getElementById("registerPassword").value.trim();
    var passwordError = document.getElementById("passwordError");

    // Use a regular expression to validate the password format
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\-;:!?./*&$])[a-zA-Z\d_\-;:!?./*&$]{12,}$/;

    if (!passwordRegex.test(password)) {
        // Check individual conditions and display specific error messages
        if (password.length < 1) {
            passwordError.textContent = "Needs at least 12 characters.";
        } else if (!/[a-z]/.test(password)) {
            passwordError.textContent = "Needs at least one lowercase letter.";
        } else if (!/[A-Z]/.test(password)) {
            passwordError.textContent = "Needs at least one uppercase letter.";
        } else if (!/\d/.test(password)) {
            passwordError.textContent = "Needs at least one digit.";
        } else if (!/[_\-;:!?./*&$]/.test(password)) {
            passwordError.textContent = "Needs at least one special character.";
        } else {
            passwordError.textContent = "Password must meet the specified criteria.";
        }

        return false;
    } else {
        passwordError.textContent = "";
        return true;
    }
}

function validateEmail() {
    var email = document.getElementById("email").value.trim();
    var emailError = document.getElementById("emailError");

    // Use a simple email validation regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = "Please enter a valid email.";
        return false;
    } else {
        emailError.textContent = "";
        return true;
    }
}
