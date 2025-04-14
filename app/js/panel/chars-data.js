import { createCharts, updateCharts } from './chars.js';
export const get_reading = (data) => {
    $.ajax({
        url: "/app/php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "get_reading",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            //valida si se tiene datos 
            if (respuesta && Array.isArray(respuesta.data)) {
                if (respuesta.data.length === 0) {
                    console.warn("No se encontraron datos para graficar.");
                    $('#charts-container').html('<p class="text-muted text-center">No se encontraron datos para graficar.</p>');
                    return;
                }

                if (!window.chartsCreated) {
                    createCharts(respuesta.data);
                    window.chartsCreated = true;
                } else {
                    updateCharts(respuesta.data);
                }
            } else {
                $('#charts-container').html('<p class="text-muted text-center">No se pudieron cargar los datos.</p>');
                messages(respuesta);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:");
            console.error("Estado:", status);
            console.error("Código de estado HTTP:", xhr.status);
            console.error("Texto de respuesta:", xhr.statusText);
            console.error("Detalles del error:", error);
            $('#charts-container').html('<p class="text-danger text-center">Error al cargar los datos del servidor.</p>');
            messages(status);
        }
    });
};
