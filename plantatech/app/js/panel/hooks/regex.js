export const regex = (id, value) => {
    let isValid = true;
    switch (id) {
        case 'min_value_sensor':
        case 'max_value_sensor':
            isValid = /^-?\d+$/.test(value);
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

    $('#config-alarms input:visible:enabled').each(function () {
        if ($(this).val().trim() === '' || $(this).hasClass('is-invalid')) {
            allValid = false;
        }
    });
    return allValid;
};
