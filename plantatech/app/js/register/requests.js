import {messages} from '../hooks/messages.js';
import {resetValuesUserR} from './hooks/resetForms.js';
export const registerUser = (data) => {
    $("#loadingSpinner").removeClass("d-none").addClass("d-block");
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "new_user",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            let status = messages(respuesta);
            if (status){
                setTimeout(() => {
                    window.location.href = 'confirm-email';
                }, 2000);
            }
            resetValuesUserR();
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