export const regex = (id, value) => {
    let isValid = true;
    switch (id) {
        case 'user_name':
        case 'user_last_name':
            isValid = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value);
            break;
        case 'user_email':
            isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            break;
        case 'user_pass':
            isValid =  /^(?=.*\d)(?=.*[@]).{8,}$/.test(value);
            break;
        default:
            isValid = false;
            break;
    }
    return isValid;
};

export const cssRegex = (isValid, input, value) => {
    if (!isValid || value === '') {
        input.addClass('is-invalid').removeClass('is-valid');
    } else {
        input.addClass('is-valid').removeClass('is-invalid');
    }

    let allValid = true;

    $('#add-users input:visible:enabled').each(function () {
        if ($(this).val().trim() === '' || $(this).hasClass('is-invalid')) {
            allValid = false;
        }
    });
    return allValid;
};

// Verifica los campos y el captcha
export const checkFormAndCaptcha = () => {
    let allValid = true;

    $('#add-users input:visible:enabled').each(function () {
        if ($(this).val().trim() === '' || $(this).hasClass('is-invalid')) {
            allValid = false;
        }
    });

    let recaptchaValue = $('#g-recaptcha-response').val();
    if (!recaptchaValue) {
        allValid = false;
    }

    $('#user_registration').prop('disabled', !allValid);
};

// Callback de éxito del captcha
window.onCaptchaSuccess = function () {
    checkFormAndCaptcha(); // Se llama cuando el usuario hace clic y resuelve el captcha
};

// Callback de expiración del captcha
window.onCaptchaExpired = function () {
    $('#user_registration').prop('disabled', true);
};
