export const setDetails = (data) => {
    const datos = data?.datos;
    if (!datos || typeof datos !== 'object') {
        return console.error('Datos no válidos o faltantes');
    }
    const {
        first_name = '',
        last_name = '',
        email = '',
        api_key = '',
        total_pots = '',
        total_alarm = ''
    } = datos;

    $('.add-name-user').text(first_name);
    $('.add-user-email').text(email);
    $('.add-all-user-name').text(`${first_name} ${last_name}`);
    $('.pot-total').text(total_pots);
    $('.alarm-total').text(total_alarm);

    $('#firstname-profile').val(first_name);
    $('#lastname-profile').val(last_name);
    $('#useremail-profile').val(email);
    $('#apikey-user').val(api_key);

    const $imagen = $('.load-avatar');
    const rutaImagen = 'src/img/avatar.jpg';

    $imagen
        .attr('src', rutaImagen)
        .off('error')
        .on('error', function () {
            console.error('Error al cargar la imagen de avatar');
            $(this).attr('src', '');
        });
};
