export const getInputValue = (data)=>{
    let user_email = $('#user_email_login').val().trim();
    let user_pass = $('#user_pass_login').val().trim();
    data = {
        "user_email": user_email,
        "user_pass": user_pass
    }
    return data;
}

export const userData = () =>{
    let email = localStorage.getItem("user_email");
    let data = {
        "user_email": email
    }
    return data;
}

export const delValues = () =>{
    $('#user_email_login').val("")
    $('#user_pass_login').val("")
}