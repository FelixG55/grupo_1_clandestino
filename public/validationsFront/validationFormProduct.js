window.addEventListener('load', function () {
    let form = document.getElementById('formProduct');
    formProduct.addEventListener('submit', function (event) {

        
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
        
         //Campo imagen(falta esto)
         let erroresImagen = []
         let campoImagen = document.getElementById('image');
 
         if (campoImagen.value) {
             erroresImagen.push("La imagen debe ser en formato JPG, JPEG, PNG, GIF");
         } 
       
    
})})