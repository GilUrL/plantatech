export const getRegisterPots = () =>{
    let cod_user = localStorage.getItem('cod_user');
    let data = {
        "name_pot": $('#name-pot').val().trim(),
        "location_pot": $('#location-pot').val().trim(),
        "cod_user": cod_user
    }
    return data;
}
export const getUpdatePots = () =>{
    let cod_user = localStorage.getItem('cod_user');
    let data = {
        "name_pot": $('#update-name-pot').val().trim(),
        "location_pot": $('#update-location-pot').val().trim(),
        "identifier": $('#Identifier').val(),
        "cod_user": cod_user
    }
    return data;
}
export const getDeletePots= (button) =>{
    let identifier = $(button).data("identifier");
    let data = {
        "identifier": identifier
    }
    return data;
}
export const setValuesDefault = (button) =>{
    $('#update-name-pot').val($(button).data("pot-name"));
    $('#update-location-pot').val($(button).data("pot-location"));
    $('#Identifier').val($(button).data("identifier"));
}
export const getReadingPots = () =>{
    let cod_user = localStorage.getItem('cod_user');
    let data = {
        "cod_user": cod_user
    }
    return data;
}
export const configValues = (button) =>{
    const sensor_type = $(button).data('value-identifier');
    const pot_identifier = $(button).data('pot-identifier');
    let data = {
        "sensor_type": sensor_type,
        "identifier": pot_identifier
    }
    return data;
}

export const user_data = () =>{
    let cod_user = localStorage.getItem('cod_user');
    let data = {
        "cod_user": cod_user
    }
    return data;
}