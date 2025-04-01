export const getvalues=() =>{
    let user_email = $('#user-email').val().trim();
    let data = {
        'user_email': user_email
    }
    return data;
}
