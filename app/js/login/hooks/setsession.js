/**
 * Guarda la sesion del usuario en `localStorage`.
 */
export const addSessions = (data) => {
    if (data && data.user_name && data.cod_user) {
        localStorage.setItem('user_name', data.user_name);
        localStorage.setItem('cod_user', data.cod_user);
        localStorage.setItem('user_email', data.user_email);
    } else {
        console.error('Datos incompletos o invalidos');
    }
};

