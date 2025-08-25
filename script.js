const CREDENTIALS = {
    email: "user@kalvium.com",
    password: "password123"
};

const VALIDATION = {
    emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    passwordMinLength: 6
};

const ERROR_MESSAGES = {
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    passwordRequired: "Password is required",
    passwordTooShort: "Password must be at least 6 characters long",
    invalidCredentials: "Invalid email or password. Please try again.",
    loginFailed: "Login failed. Please try again."
};

let emailInput, passwordInput, loginForm, loginBtn, passwordToggle;
let emailError, passwordError, generalError;
let loginSection, successSection, userEmailDisplay, logoutBtn;

let isEmailValid = false;
let isPasswordValid = false;
let isSubmitting = false;

document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    checkExistingSession();
});

function initializeElements() {
    emailInput = document.getElementById('email');
    passwordInput = document.getElementById('password');
    loginForm = document.getElementById('login-form');
    loginBtn = document.getElementById('login-btn');
    passwordToggle = document.getElementById('password-toggle');
    emailError = document.getElementById('email-error');
    passwordError = document.getElementById('password-error');
    generalError = document.getElementById('general-error');
    loginSection = document.getElementById('login-section');
    successSection = document.getElementById('success-section');
    userEmailDisplay = document.getElementById('user-email');
    logoutBtn = document.getElementById('logout-btn');
}

function setupEventListeners() {
    emailInput.addEventListener('input', handleEmailInput);
    emailInput.addEventListener('blur', handleEmailBlur);
    passwordInput.addEventListener('input', handlePasswordInput);
    passwordInput.addEventListener('blur', handlePasswordBlur);
    passwordToggle.addEventListener('click', togglePasswordVisibility);
    loginForm.addEventListener('submit', handleFormSubmission);
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

function checkExistingSession() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        const userEmail = sessionStorage.getItem('userEmail');
        showSuccessPage(userEmail);
    }
}

function handleEmailInput() {
    const email = emailInput.value.trim();
    clearError(emailError);
    emailInput.classList.remove('invalid');
    if (email.length > 0) {
        validateEmail(email, false);
    }
    updateFormState();
}

function handleEmailBlur() {
    const email = emailInput.value.trim();
    validateEmail(email, true);
    updateFormState();
}

function validateEmail(email, showErrors = true) {
    if (!email) {
        isEmailValid = false;
        if (showErrors) {
            showError(emailError, ERROR_MESSAGES.emailRequired);
            emailInput.classList.add('invalid');
        }
        return false;
    }
    if (!VALIDATION.emailRegex.test(email)) {
        isEmailValid = false;
        if (showErrors) {
            showError(emailError, ERROR_MESSAGES.emailInvalid);
            emailInput.classList.add('invalid');
        }
        return false;
    }
    isEmailValid = true;
    if (showErrors) {
        clearError(emailError);
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
    }
    return true;
}

function handlePasswordInput() {
    const password = passwordInput.value;
    clearError(passwordError);
    passwordInput.classList.remove('invalid');
    if (password.length > 0) {
        validatePassword(password, false);
    }
    updateFormState();
}

function handlePasswordBlur() {
    const password = passwordInput.value;
    validatePassword(password, true);
    updateFormState();
}

function validatePassword(password, showErrors = true) {
    if (!password) {
        isPasswordValid = false;
        if (showErrors) {
            showError(passwordError, ERROR_MESSAGES.passwordRequired);
            passwordInput.classList.add('invalid');
        }
        return false;
    }
    if (password.length < VALIDATION.passwordMinLength) {
        isPasswordValid = false;
        if (showErrors) {
            showError(passwordError, ERROR_MESSAGES.passwordTooShort);
            passwordInput.classList.add('invalid');
        }
        return false;
    }
    isPasswordValid = true;
    if (showErrors) {
        clearError(passwordError);
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
    }
    return true;
}

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function updateFormState() {
    const isFormValid = isEmailValid && isPasswordValid;
    loginBtn.disabled = !isFormValid || isSubmitting;
    if (isFormValid) {
        clearError(generalError);
    }
}

function togglePasswordVisibility() {
    const eyeOpen = passwordToggle.querySelector('.eye-open');
    const eyeClosed = passwordToggle.querySelector('.eye-closed');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
        passwordToggle.setAttribute('aria-label', 'Hide password');
    } else {
        passwordInput.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
        passwordToggle.setAttribute('aria-label', 'Show password');
    }
}

function handleFormSubmission(event) {
    event.preventDefault();
    if (isSubmitting) {
        return;
    }
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const isEmailValidFinal = validateEmail(email, true);
    const isPasswordValidFinal = validatePassword(password, true);
    if (!isEmailValidFinal || !isPasswordValidFinal) {
        return;
    }
    clearError(generalError);
    authenticateUser(email, password);
}

function authenticateUser(email, password) {
    isSubmitting = true;
    updateFormState();
    showLoadingState();
    setTimeout(() => {
        if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
            handleSuccessfulLogin(email);
        } else {
            handleFailedLogin();
        }
    }, 1500);
}

function handleSuccessfulLogin(email) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userEmail', email);
    isSubmitting = false;
    hideLoadingState();
    showSuccessPage(email);
    resetForm();
}

function handleFailedLogin() {
    isSubmitting = false;
    updateFormState();
    hideLoadingState();
    showError(generalError, ERROR_MESSAGES.invalidCredentials);
    passwordInput.value = '';
    passwordInput.classList.remove('valid');
    isPasswordValid = false;
    emailInput.focus();
}

function showLoadingState() {
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');
    btnText.style.opacity = '0';
    btnLoader.style.display = 'block';
    loginBtn.disabled = true;
}

function hideLoadingState() {
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');
    btnText.style.opacity = '1';
    btnLoader.style.display = 'none';
}

function showSuccessPage(email) {
    loginSection.classList.remove('active');
    successSection.classList.add('active');
    if (userEmailDisplay) {
        userEmailDisplay.textContent = email;
    }
}

function resetForm() {
    emailInput.value = '';
    passwordInput.value = '';
    emailInput.classList.remove('valid', 'invalid');
    passwordInput.classList.remove('valid', 'invalid');
    clearError(emailError);
    clearError(passwordError);
    clearError(generalError);
    isEmailValid = false;
    isPasswordValid = false;
    passwordInput.type = 'password';
    const eyeOpen = passwordToggle.querySelector('.eye-open');
    const eyeClosed = passwordToggle.querySelector('.eye-closed');
    eyeOpen.style.display = 'block';
    eyeClosed.style.display = 'none';
}

function handleLogout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    successSection.classList.remove('active');
    loginSection.classList.add('active');
    resetForm();
    emailInput.focus();
}

function logValidationState() {
    console.log('Validation State:', {
        email: {
            value: emailInput.value,
            valid: isEmailValid
        },
        password: {
            value: passwordInput.value ? '[HIDDEN]' : '[EMPTY]',
            valid: isPasswordValid
        },
        formValid: isEmailValid && isPasswordValid,
        isSubmitting: isSubmitting
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && (event.target === emailInput || event.target === passwordInput)) {
        if (!loginBtn.disabled) {
            loginForm.dispatchEvent(new Event('submit'));
        }
    }
    if (event.key === 'Escape') {
        clearError(generalError);
    }
});

window.fillDemoCredentials = function() {
    emailInput.value = CREDENTIALS.email;
    passwordInput.value = CREDENTIALS.password;
    handleEmailInput();
    handlePasswordInput();
    handleEmailBlur();
    handlePasswordBlur();
};
