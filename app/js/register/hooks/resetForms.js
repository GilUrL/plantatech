import {checkFormAndCaptcha} from "./regex.js";

export const resetValuesUserR = () => {
    $('#user_name').val("").removeClass("is-valid is-invalid");
    $('#user_last_name').val("").removeClass("is-valid is-invalid");
    $('#user_email').val("").removeClass("is-valid is-invalid");
    $('#user_pass').val("").removeClass("is-valid is-invalid");
    grecaptcha.reset();
    checkFormAndCaptcha();
}
