export const regex = () =>{
    function validarCorreo(correo) {
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexCorreo.test(correo);
    }
    function validarPassword(password) {
        const regexPassword = /^(?=.*\d)(?=.*[@]).{8,}$/;

        return regexPassword.test(password);
    }
    function validarFormulario() {
        let correoValido = validarCorreo($("#user_email_login").val());
        let passwordValido = validarPassword($("#user_pass_login").val());

        if (correoValido) {
            $("#user_email_login").removeClass("is-invalid").addClass("is-valid");
        } else {
            $("#user_email_login").removeClass("is-valid").addClass("is-invalid");
        }

        if (passwordValido) {
            $("#user_pass_login").removeClass("is-invalid").addClass("is-valid");
        } else {
            $("#user_pass_login").removeClass("is-valid").addClass("is-invalid");
        }
        $("#user_login").prop("disabled", !(correoValido && passwordValido));
    }

    $("#user_email_login, #user_pass_login").on("input", validarFormulario);

    $("#user_login").prop("disabled", true);
}
