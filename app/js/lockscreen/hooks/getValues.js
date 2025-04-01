export const getInputUnlock = ()=>{
    let email = localStorage.getItem("user_email");
    console.log(email);
    let user_pass = $('#user_pass_unlocked').val().trim();
    let datos = {
        "user_email": email,
        "user_pass": user_pass
    }
    return datos;
}
export const user_data = () =>{
    let cod_user = localStorage.getItem('cod_user');
    let data = {
        "cod_user": cod_user
    }
    return data;
}