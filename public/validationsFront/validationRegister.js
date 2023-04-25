window.addEventListener('load', function(){
    let formRegister = document.getElementById('formRegister');
    let errores =[]
    formRegister.addEventListener('submit',function (event){
        
        let campoNombre = document.getElementById('name');
        console.log(campoNombre);
        if (campoNombre.value == "") {
            console.log(campoNombre.value);
            errores.push("Campo obligatorio");
        }else if(campoNombre.value.length >= 2){
            errores.push("Debe tener al menos dos caracteres")
        }    
        if(errores.length > 0){
            event.preventDefault();
            let ulErrores = document.querySelector(".error-msg ul");
            errores.forEach(error =>{
                ulErrores.innerHTML += `<li> ${error} </li>`
            });
        }    
    })

   console.log();
})
