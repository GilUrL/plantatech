import { messages } from '../hooks/messages.js';
import { setDetails } from './hooks/setUserDetails.js';

//Cerrar sesion 
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
//intentar evitar que el usuario regrese 
window.onpopstate = function () {
    window.location.replace("login");
};

//Obtener los detalles del usuario
export const userDetails = (data) => {
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "user_details",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            if (respuesta) {
                setDetails(respuesta)
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
export const new_pot = (data) => {
    console.log(data);
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "new_pot",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            if (respuesta) {
                messages(respuesta);
                $('#add-pots').modal('hide');
                listPots();
            }else {
                messages(respuesta);
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
export const updatePots = (data) => {
    $.ajax({
        url: "php/api/",
        method: "PUT",
        data: JSON.stringify({
            request: "update_pot",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            if (respuesta) {
                messages(respuesta);
                $('#update-pots').modal('hide');
                listPots();
            }else {
                messages(respuesta);
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
export const deletePots = (data) => {
    swal({
        title: "¿Estás seguro?",
        text: "¡Esta acción eliminará la maceta y no se podrá recuperar!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false
    },
    function(){
        $.ajax({
            url: "php/api/",
            method: "DELETE",
            data: JSON.stringify({
                request: "delete_pot",
                package: data
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (respuesta) {
                if (respuesta) {
                    messages(respuesta);
                    $('#update-pots').modal('hide');
                    listPots();
                } else {
                    messages(respuesta);
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
    });
}
export const listPots = () => {
    const cod_user = localStorage.getItem('cod_user');
    let data = {
        "cod_user": cod_user
    };
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "get_pots",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            if (respuesta.status) {
                let table = $(".table-pots").DataTable();
                table.clear();

                const rows = respuesta.data.map(item => [
                    item.pot_name,
                    item.pot_location,
                    item.Identifier,
                    item.pot_status,
                    `<button type="button" class="btn btn-primary" id="update-pots-table"
                        data-bs-toggle="modal" 
                        data-bs-target="#update-pots"
                        data-identifier="${item.Identifier}"
                        data-pot-name="${item.pot_name}"
                        data-pot-location="${item.pot_location}"
                        data-pot-status="${item.pot_status}"
                        >Editar</button>`,
                    `<button type="button" class="btn bg-danger"
                        data-identifier ="${item.Identifier}"
                        id="sa-params">Eliminar</button>`
                ]);

                table.rows.add(rows).draw();
            } else {
                console.warn("No hay datos que mostrar.");
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
};

export const get_alarms = (data) => {
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "get_alarm",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            if (respuesta) {
                console.log("Datos recibidos:", respuesta.data);
                $('#min_value_sensor').val(respuesta.data[0]['min_threshold']);
                $('#max_value_sensor').val(respuesta.data[0]['max_threshold']);
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

export const get_alerts = (data) => {
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "get_alert",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            if (respuesta.data && Array.isArray(respuesta.data)) {
                const alertsContainer = $('#alerts-container');
                alertsContainer.empty(); 
                respuesta.data.forEach(alert => {
                    const alarmMessage = alert.alarm_values || "Alerta sin mensaje";
                    const potName = alert.pot_name || "Desconocido";
                    const createdAt = alert.created_at || "Fecha desconocida";
                    const status = alert.status || "unknown";

                    const alertHtml = `
                        <div class="col-lg-4 mb-4">
                            <div class="card shadow-sm border-0">
                                <div class="card-body position-relative">
                                    <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-3 px-3 py-2">
                                        <i class="mdi mdi-alert-circle-outline me-1"></i> ${status === 'active' ? 'Activa' : 'Inactiva'}
                                    </span>
                                    <h5 class="text-warning text-end mt-3"> ${potName}</h5>
                                    <div class="p-3 mt-4 rounded text-dark bg-light">
                                        <p class="mb-1"><strong>Mensaje:</strong> <span class="text-danger fw-bold">${alarmMessage}</span></p>
                                        <p class="mb-0"><strong>Fecha:</strong> <span class="text-primary fw-bold">${createdAt}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;                    
                    alertsContainer.append(alertHtml);
                });
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

export const set_notification = (data) => {
    $.ajax({
        url: "php/api/",
        method: "POST",
        data: JSON.stringify({
            request: "get_alert",
            package: data
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (respuesta) {
            console.log(respuesta.data);
            // Llamar a función para mostrar notificaciones
            displaySensorAlerts(respuesta.data);
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

function displaySensorAlerts(alerts) {
    const notificationsMenu = $('.menu.sm-scrol');
    notificationsMenu.empty();
    if (alerts && alerts.length > 0) {
        const activeAlerts = alerts.filter(alert => alert.status === 'active');
        const alertCount = activeAlerts.length;
        if (alertCount > 0) {
            $('.pulse-wave').text(alertCount).show();
        } else {
            $('.pulse-wave').hide();
        }
        activeAlerts.forEach(alert => {
            const alertItem = `
            <li>
                <a href="#" class="notification-item text-wrap text-break" data-alert-id="${alert.id_alarm}">
                    <i class="fa ${getAlertIcon(alert.alarm_values)} text-danger"></i>
                    <div class="notification-content">
                        <strong class="d-inline-block text-truncate" style="max-width: 100%;">${alert.pot_name}</strong>
                        <div class="text-wrap text-break">${extractAlertMessage(alert.alarm_values)}</div>
                        <small class="text-muted d-block mt-1">${formatDateTime(alert.created_at)}</small>
                    </div>
                </a>
            </li>
            `;
            notificationsMenu.append(alertItem);
        });
    } else {
        notificationsMenu.append(`
            <li>
                <a href="#">
                    <i class="fa fa-check-circle text-success"></i> No hay alertas activas
                </a>
            </li>
        `);
        $('.pulse-wave').hide();
    }
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}
function extractAlertMessage(alarmValues) {
    return alarmValues.replace(/^Alerta:\s*/i, '');
}

function getAlertIcon(alarmValues) {
    if (alarmValues.includes('Humedad')) return 'fa-tint';
    if (alarmValues.includes('Temperatura')) return 'fa-thermometer-half';
    if (alarmValues.includes('Luz')) return 'fa-lightbulb';
    if (alarmValues.includes('Agua')) return 'fa-water';
    return 'fa-exclamation-triangle';
}

function formatDateTime(dateTimeString) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleString('es-ES', options);
}