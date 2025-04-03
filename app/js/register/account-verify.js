$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    $(document).on('click', '.login-page', function() {
        location.href = '/app/login';
    });
    if (token) {
        $.getJSON(`/app/php/api/index.php?request=verify_acount&token=${token}`, function(data) {
            $('#spinner').addClass('d-none');
            $('#mensaje').removeClass('d-none');

            if (data.status) {
                $('#mensaje').html(`
                    <h3 class="text-success mb-3">¡Cuenta verificada!</h3>
                    <p>${data.msg}</p>
                    <a href="#" class="btn btn-success mt-3 login-page">Iniciar sesión</a>
                `);
            } else {
                $('#mensaje').html(`
                    <h3 class="text-danger mb-3">Error de verificación</h3>
                    <p>${data.msg}</p>
                    <a href="#" class="btn btn-secondary mt-3 login-page">Volver al inicio</a>
                `);
            }
        }).fail(function(jqXHR) {
            console.error("Error:", jqXHR.status, "URL:", jqXHR.responseURL);
            $('#spinner').addClass('d-none');
            $('#mensaje').removeClass('d-none').html(`
                <h3 class="text-danger mb-3">Error inesperado</h3>
                <p>Ocurrió un problema al verificar tu cuenta. Intenta más tarde.</p>
                <a href="#" class="btn btn-secondary mt-3 login-page">Volver al inicio</a>
            `);
        });
    } else {
        $('#spinner').addClass('d-none');
        $('#mensaje').removeClass('d-none').html(`
            <h3 class="text-danger mb-3">Token inválido</h3>
            <p>No se encontró un token válido para verificar tu cuenta.</p>
            <a href="#" class="btn btn-secondary mt-3 login-page">Volver al inicio</a>
        `);
    }
});