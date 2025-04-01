export const getInputValues = (data) =>{
    let user_name = $('#user_name').val().trim();
    let user_last_name = $('#user_last_name').val().trim();
    let user_email = $('#user_email').val().trim();
    let user_pass = $('#user_pass').val().trim();
    data = {
        "user_name": user_name,
        "user_last_name": user_last_name,
        "user_email": user_email,
        "user_pass": user_pass
    }
    return data;
}
