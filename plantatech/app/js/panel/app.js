//Importar funciones 
import { logOutUser, userDetails, get_alerts, set_notification} from './data.js';
import { removeSessions } from '../hooks/allsession.js';
import {user_data} from './hooks/getValues.js';
//Cargar los datos del usuario
const data = user_data();
$(document).ready(function () {
    userDetails(data);
    get_alerts(data);
    set_notification(data);
});
//cerrar sesion del usuario
$('#user_logout').on('click', function () {
    logOutUser();
    removeSessions();
});
// implementar pantalla de bloqueo
$('#account_locked').on('click', function () {
    localStorage.setItem("session_locked", "true");
    window.location.href = "account-lock";
});

//bloquear pantalla despues de 5 minutos 
let inactivityTime = 5 * 60 * 1000;
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        localStorage.setItem("session_locked", "true");
        window.location.href = "account-lock";
    }, inactivityTime);
}
//reiniciar el contador depues de alguno de estos eventos
document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keydown", resetInactivityTimer);
document.addEventListener("touchstart", resetInactivityTimer);
document.addEventListener("click", resetInactivityTimer);
resetInactivityTimer();