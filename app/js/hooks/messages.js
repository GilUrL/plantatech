export const messages = (response) => {
    const status = response?.status ?? false;
    const msg = response?.msg ?? 'Ocurrió un error inesperado';
    swal({
        title: status ? 'Éxito' : 'Error',
        text: msg,
        icon: status ? 'success' : 'error'
    });
    return status;
};

export const error = (response) =>{
    const status = response?.status ?? false;
    const msg = response?.msg ?? 'Ocurrió un error inesperado';
    swal({
        title: status ? 'Éxito' : 'Error',
        text: msg,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Confirmar cuenta",
        closeOnConfirm: false
      },
      function(){
        window.location.href = 'confirm-email';
      });
}
export const forgotPass = (response) =>{
  const status = response?.status ?? false;
  const msg = response?.msg ?? 'Ocurrió un error inesperado';
  swal({
      title: status ? 'Éxito' : 'Error',
      text: msg,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Recuperar cuenta",
      closeOnConfirm: false
    },
    function(){
      window.location.href = 'restore-account';
    });
}