import { createCharts, updateCharts } from './chars.js';
export const get_reading = (data) => {
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "get_reading",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            if (respuesta) {
                if (!window.chartsCreated) {
                    createCharts(respuesta.data);
                    window.chartsCreated = true; 
                } else {                 
                    updateCharts(respuesta.data);
                }
            } else {
                messages(respuesta);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:");
            console.error("Estado:", status);
            console.error("Código de estado HTTP:", xhr.status);
            console.error("Texto de respuesta:", xhr.statusText);
            console.error("Detalles del error:", error);
            messages(status);
        }
    });
};