window.addEventListener('load', function () {
    let formRegister = document.getElementById('formRegister');
    formRegister.addEventListener('submit', function (event) {

        //Campo Name
        let erroresName = []
        let campoNombre = document.getElementById('name');

        if (campoNombre.value == "") {
            erroresName.push("El campo nombre es obligatorio");
        } if (campoNombre.value.length < 2) {
            erroresName.push("El campo nombre debe tener al menos dos caracteres")
        };

        if (erroresName.length > 0) {
            event.preventDefault();
            let ulErrores = document.querySelector(".error-msg-name ul");
            console.log(erroresName);
            erroresName.forEach(error => {
                ulErrores.innerHTML += `<li> ${error} </li>`
            });
        }
        //Campo lastname
        let erroresLastname = []
        let campoLastname = document.getElementById('lastname');

        if (campoLastname.value == "") {
            erroresLastname.push("El campo apellido es obligatorio");
        }if (campoLastname.value.length < 2) {
            erroresLastname.push("El campo apellido debe tener al menos dos caracteres")
        };
        if (erroresLastname.length > 0) {
            event.preventDefault();
            let ulErrores = document.querySelector(".error-msg-lastname ul");
            erroresLastname.forEach(error => {
                ulErrores.innerHTML += `<li> ${error} </li>`
            });
        }

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
           ulErrores.innerHTML += `<li> ${error} </li>`
           
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
        //Campo imagen(falta esto)
        let erroresImagen = []
        let campoImagen = document.getElementById('image');

        if (campoImagen.value) {
            erroresImagen.push("La imagen debe ser en formato JPG, JPEG, PNG, GIF");
        } 
      
    
})})


