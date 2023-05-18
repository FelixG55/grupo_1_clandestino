window.addEventListener('load', function () {
    let formLogin = document.getElementById('formLogin');
    formLogin.addEventListener('submit', function (event) {

        
        //Campo Email
        let erroresEmail = [];
        let campoEmail = document.getElementById('email');
        var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if (campoEmail.value == "") {
            erroresEmail.push("El campo Email es obligatorio");
        } if (!validEmail.test(campoEmail.value)) {
            erroresEmail.push("El campo Email debe ser valido");

        if (erroresEmail.length > 0) {
           event.preventDefault();
           let ulErrores = document.querySelector(".error-msg-Email ul");
           erroresEmail.forEach(error => {
           ulErrores.innerHTML += `<li> ${campoEmail.value} </li>`
           
                });
            }
        }
        //Campo contraseña
        let erroresPassword = []
        let campoPassword = document.getElementById('password');

        if (campoPassword.value == "") {
            erroresPassword.push("El campo password es obligatorio");
        } if (campoPassword.value.length < 8) {
            erroresPassword.push("El campo password debe tener al menos ocho caracteres")
        };
        if (erroresPassword.length > 0) {
            event.preventDefault();
            let ulErrores = document.querySelector(".error-msg-password ul");
            erroresPassword.forEach(error => {
                ulErrores.innerHTML += `<li> ${error} </li>`
            });
        }
        
    
})})
