import { getInputValue, userData,delValues} from './hooks/getValues.js';
import { user_login, requestNewEmail } from './data.js';
import { regex } from './hooks/regex.js';
$(function () {
    regex();
});
$('#user_login').on('click', function () {
    let data = getInputValue();
    user_login(data);
    regex();
    delValues();
}); 
$('#password-reset').on('click', function () {
    window.location.href='restore-account'
});
$('#btnLogin').on('click', function(){
    window.location.href='login'
});
$('#btnPageRegister').on('click', function(){
    window.location.href='register'
});
$('#new_email_confirm').on('click', function () {
    let data = userData();
    requestNewEmail(data);
});
