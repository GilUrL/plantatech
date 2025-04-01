export const getSessions = () => {
    const user_name = localStorage.getItem("user_name");
    const cod_user = localStorage.getItem("cod_user");
    const sessionLocked = localStorage.getItem("session_locked");

    // Páginas de autenticación (no requieren sesión activa)
    const isLoginPage = window.location.pathname.includes("auth_login.html");
    const isRegisterPage = window.location.pathname.includes("auth_register.html");
    const isUserPassPage = window.location.pathname.includes("auth_user_pass.html");
    const isUserLockPage = window.location.pathname.includes("auth_lockscreen.html");

    const isProtectedPage = !isLoginPage && !isRegisterPage && !isUserPassPage && !isUserLockPage;

    // Si no hay sesión o la sesión fue eliminada, redirigir al login
    if ((!user_name || !cod_user) && isProtectedPage) {
        window.location.href = "login";
        return false;
    }

    // Si la sesión está bloqueada y NO estamos en la pantalla de bloqueo, redirigir
    if (sessionLocked === "true" && !isUserLockPage) {
        window.location.href = "account-lock";
        return false;
    }

    // Si la sesión está activa y el usuario intenta acceder a login, registro o recuperación, redirigir al index
    if (user_name && cod_user && (isLoginPage || isRegisterPage || isUserPassPage)) {
        window.location.href = "panel";
        return false;
    }

    return { user_name, cod_user };
};

// Al cargar la página, validar sesión
document.addEventListener("DOMContentLoaded", getSessions);
