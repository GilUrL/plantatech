export const regex = (id, value) => {
    let isValid = true;
    switch (id) {
        case 'user_pass_unlocked':
            isValid = /^(?=.*\d)(?=.*[@]).{8,}$/.test(value);
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

    $('#account_unlocked-form input:visible:enabled').each(function () {
        if ($(this).val().trim() === '' || $(this).hasClass('is-invalid')) {
            allValid = false;
        }
    });
    return allValid;
};
