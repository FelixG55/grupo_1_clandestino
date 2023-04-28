window.addEventListener('load', function(){

    let formRegister = document.getElementById('formRegister');
    formRegister.addEventListener('submit',function (event){
        let errores =[]
        let campoNombre = document.getElementById('name');
        console.log(campoNombre.value);
        if (campoNombre.value == "" ) {
            errores.push("Campo obligatorio");
        }else if(campoNombre.value.length <= 2){
            errores.push("Debe tener al menos dos caracteres")
        }  

        if(errores.length > 0){
            event.preventDefault();
            let ulErrores = document.querySelector(".error-msg ul");
            ulErrores.innerHTML = "";
            errores.forEach(error =>{n
                ulErrores.innerHTML += `<li> ${error} </li>`
            });
        }
    })
})
