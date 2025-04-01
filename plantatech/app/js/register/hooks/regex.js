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
