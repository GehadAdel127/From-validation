document.addEventListener('DOMContentLoaded', () => {
    // Get all elements from the DOM
    const form = document.getElementById('form');
    const firstName = document.getElementById('firstName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatedPassword = document.getElementById('repeatedPassword');
    const errorMessages = document.getElementById('errorMessages');

    // Check if the form exists
    if (!form) {
        console.error('Form element not found.');
        return;
    }

    // Add submit event listener to the form
    form.addEventListener('submit', (e) => {
        console.log("submitted");

        // Clear previous error messages and styles
        errorMessages.innerText = '';
        clearErrorStyles();

        let errors = [];
        if (form.id === 'form') { // Check if it's the sign-up form
            errors = getSignUpFormErrors(firstName?.value, email?.value, password?.value, repeatedPassword?.value);
        } else {
            errors = getLoginFormErrors(email?.value, password?.value);
        }

        if (errors.length > 0) {
            e.preventDefault();
            console.log(errors);
            errorMessages.innerText = errors.join('. ');
        }
    });

    // Add input event listeners to clear errors when the user starts typing
    const allInputs = [firstName, email, password, repeatedPassword].filter(input => input != null);
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('incorrect')) {
                input.parentElement.classList.remove('incorrect');
                errorMessages.innerText = '';
            }
        });
    });

    // Function to validate the sign-up form
    function getSignUpFormErrors(firstName, email, password, repeatedPassword) {
        let errors = [];

        // Validate First Name
        if (firstName === '' || firstName == null) {
            errors.push('First Name is required');
            document.getElementById('firstName')?.parentElement.classList.add('incorrect');
        }

        // Validate Email
        if (email === '' || email == null) {
            errors.push('Email is required');
            document.getElementById('email')?.parentElement.classList.add('incorrect');
        }

        // Validate Password
        if (password === '' || password == null) {
            errors.push('Password is required');
            document.getElementById('password')?.parentElement.classList.add('incorrect');
        } else {
            // Check password length
            if (password.length < 8) {
                errors.push('Password must be at least 8 characters long');
                document.getElementById('password')?.parentElement.classList.add('incorrect');
            }

            // Check for at least one special character
            const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if (!specialCharacters.test(password)) {
                errors.push('Password must contain at least one special character');
                document.getElementById('password')?.parentElement.classList.add('incorrect');
            }

            // Check for at least one capital letter
            const capitalLetters = /[A-Z]+/;
            if (!capitalLetters.test(password)) {
                errors.push('Password must contain at least one capital letter');
                document.getElementById('password')?.parentElement.classList.add('incorrect');
            }
        }

        // Validate Repeated Password
        if (repeatedPassword !== password) {
            errors.push('Repeated password does not match with password');
            document.getElementById('repeatedPassword')?.parentElement.classList.add('incorrect');
        }

        return errors;
    }

    // Function to validate the login form
    function getLoginFormErrors(email, password) {
        let errors = [];

        // Validate Email
        if (email === '' || email == null) {
            errors.push('Email is required');
            document.getElementById('email')?.parentElement.classList.add('incorrect');
        }

        // Validate Password
        if (password === '' || password == null) {
            errors.push('Password is required');
            document.getElementById('password')?.parentElement.classList.add('incorrect');
        }

        return errors;
    }

    // Function to clear error styles from all input fields
    function clearErrorStyles() {
        const inputs = document.querySelectorAll('.wrapper input');
        inputs.forEach(input => {
            input.parentElement.classList.remove('incorrect');
        });
    }
});