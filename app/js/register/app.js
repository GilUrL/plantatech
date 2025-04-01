import {getInputValues} from './hooks/getvalues.js';
import {registerUser} from './requests.js';
import {regex, cssRegex} from './hooks/regex.js';
$('#user_registration').on('click', function () {
    let data = getInputValues();
    let recaptchaResponse = $("#g-recaptcha-response").val();
    data.recaptcha = recaptchaResponse; 
    if (data.user_email) {
        localStorage.setItem("user_email", data.user_email);
    }
    registerUser(data);
});
$(document).on('keyup change', '#add-users input', function () {
    let input = $(this);
    let value = input.val().trim();
    let isValid = regex(input.attr('id'), value);
    let allValid = cssRegex(isValid, input, value);
    $('#user_registration').prop('disabled', !allValid);
});

$('#btnLogin').on('click', function(){
    window.location.href='login'
});

