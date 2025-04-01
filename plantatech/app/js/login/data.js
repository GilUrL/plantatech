import {messages, error, forgotPass} from '../hooks/messages.js';
import {addSessions} from './hooks/setsession.js';
import {sessionUnlock} from '../hooks/allsession.js'
export const user_login = (data) => {
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
                    addSessions(respuesta);
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
        }
    });

}
export const requestNewEmail = (data) => {
    $("#loadingSpinner").removeClass("d-none").addClass("d-block");
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "request_new_email",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            messages(respuesta);
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
