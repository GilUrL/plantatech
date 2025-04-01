/**
 * Desbloquea la sesion del usuario eliminando la bandera de bloqueo.
 */
export const sessionUnlock = () => {
    localStorage.removeItem("session_locked");
};

/**
 * Borra todos los datos de sesion del usuario en `localStorage`.
 */
export const removeSessions = () => {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('cod_user');
    localStorage.removeItem('session_locked');
};
