import {messages, error, forgotPass} from '../hooks/messages.js';
import {sessionUnlock} from '../hooks/allsession.js'
export const user_login = (data) => {
    $("#loadingSpinner").removeClass("d-none").addClass("d-block");
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "login_user",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            if (respuesta) {
                if (respuesta.status) {
                    sessionUnlock();
                    setTimeout(() => {
                        window.location.href = 'panel';
                    }, 100);
                } else if (respuesta.error === true) {
                    forgotPass(respuesta);
                } else {
                    error(respuesta);
                }
            }            
        },
        error: function (xhr, status, error) {
            console.error("Estado:", status);
            console.error("Código de estado HTTP:", xhr.status);
            console.error("Texto de respuesta:", xhr.statusText);
            console.error("Detalles del error:", error);
            messages(status);
        },
        complete: function () {
            $("#loadingSpinner").removeClass("d-block").addClass("d-none");
        }
    });
}
export const logOutUser = () => {
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "logout"
        }),
        success: function (response) {
            if (response.status) {
                history.pushState(null, "", "login");
                window.location.replace("login");
                setTimeout(() => {
                    window.history.pushState(null, "", "login");
                }, 500);
            } else {
                console.error("Error al cerrar sesión:", response.msg);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud:", xhr.responseText);
        }
    });
};
