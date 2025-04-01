export const setDetails = (data) => {
    if (!data || !data.datos || typeof data.datos !== 'object') {
        console.error('Datos no válidos o faltantes');
    }
    const {
        first_name = '',
        last_name = '',
        email = '',
        api_key = ''
    } = data.datos;
    $('.add-name-user').text(first_name);
    $('.add-user-email').text(email);
    $('.add-all-user-name').text(`${first_name} ${last_name}`);
    $('#firstname-profile').val(first_name);
    $('#lastname-profile').val(last_name);
    $('#useremail-profile').val(email);
    $('#apikey-user').val(api_key);

    const rutaImagen = 'src/img/avatar.jpg';
    const $imagen = $('.load-avatar');
    $imagen.attr('src', rutaImagen);
    $imagen.on('error', function () {
        console.error('Error al cargar la imagen de avatar');
        $(this).attr('src', ''); 
    });
};