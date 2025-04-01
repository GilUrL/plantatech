import {regex, cssRegex} from './hooks/regex.js';
import {getvalues} from './hooks/getValues.js';
import {emailResetPassword,resetPassword} from './data.js';
$(document).on('keyup change', '#password-reset-form input', function () {
    let input = $(this);
    let value = input.val().trim();
    let isValid = regex(input.attr('id'), value);
    let allValid = cssRegex(isValid, input, value);
    $('#user-reset-pass, #new-user-password').prop('disabled', !allValid);
});
$('#user-reset-pass').on('click', function () {
    let data = getvalues();
    emailResetPassword(data);
    $('#user-email').val('');
});
$('#new-user-password').on('click', function () {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    let password = $('#user-password').val();
    let data = {
        "token": token,
        "user_pass": password
    }
    resetPassword(data);

});