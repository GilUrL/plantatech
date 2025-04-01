import { getInputUnlock, user_data } from './hooks/getValues.js';
import { user_login, logOutUser } from './data.js';
import { removeSessions } from '../hooks/allsession.js';
import {userDetails} from '../panel/data.js';
import { regex, cssRegex } from './hooks/regex.js';

const data = user_data();
$(function(){
    userDetails(data);
})
$(function () {
    $('#user_pass_unlocked').on('keypress', function (e) {
        if (e.which === 13) {
            unlock();
            return false;
        }
    });
});
$(document).on('keyup change', '#account_unlocked-form input', function () {
    let input = $(this);
    let value = input.val().trim();
    let isValid = regex(input.attr('id'), value);
    let allValid = cssRegex(isValid, input, value);
    $('#account_unlocked').prop('disabled', !allValid);
});
const unlock = () =>{
    let data = getInputUnlock();
    console.log(data);
    user_login(data);
}
$('#account_unlocked').on('click', function () {
    unlock();
});
$('#user_changed').on('click', function () {
    logOutUser();
    removeSessions();
})

