import { messages } from '../hooks/messages.js';
export const emailResetPassword = (data) => {
    $("#loadingSpinner").removeClass("d-none").addClass("d-block");
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "send_reset_email",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            if (respuesta) {
                messages(respuesta);
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
            // Ocultar el spinner
            $("#loadingSpinner").removeClass("d-block").addClass("d-none");
        }
    });
}

export const resetPassword = (data) => {
    $("#loadingSpinner").removeClass("d-none").addClass("d-block");
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "reset_pass_account",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            if (respuesta) {
                messages(respuesta);
                setTimeout(() => {
                    window.location.href = 'login';
                }, 2000);
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
            // Ocultar el spinner
            $("#loadingSpinner").removeClass("d-block").addClass("d-none");
        }
    });
}