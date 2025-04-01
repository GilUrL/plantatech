export const regex = (id, value) => {
    let isValid = true;
    switch (id) {
        case 'user-email':
            isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            break;
        case 'user-password':
            isValid = /^(?=.*[a-z])(?=.*\d).{8,}$/.test(value);
            break;
        default:
            isValid = false; // Por defecto, lo marca inválido si no es contemplado
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

    $('#password-reset-form input:visible:enabled').each(function () {
        if ($(this).val().trim() === '' || $(this).hasClass('is-invalid')) {
            allValid = false;
        }
    });
    return allValid;
};
