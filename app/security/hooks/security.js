export const getSessions = async () => {
    const res = await fetch('security/hooks/check_session.php', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();

    if (data.status) {
        localStorage.setItem("user_name", data.user_name);
        localStorage.setItem("cod_user", data.cod_user);
    } else {
        localStorage.clear(); 
    }

    const isLoginPage = window.location.pathname.includes("auth_login.html");
    const isRegisterPage = window.location.pathname.includes("auth_register.html");
    const isUserPassPage = window.location.pathname.includes("auth_user_pass.html");
    const isUserLockPage = window.location.pathname.includes("auth_lockscreen.html");

    const isProtectedPage = !isLoginPage && !isRegisterPage && !isUserPassPage && !isUserLockPage;

    if (!data.status && isProtectedPage) {
        window.location.href = "login";
        return false;
    }

    if (data.status && (isLoginPage || isRegisterPage || isUserPassPage)) {
        window.location.href = "panel";
        return false;
    }

    return data; // puedes usar user_name y cod_user en otras funciones
};

document.addEventListener("DOMContentLoaded", getSessions);
