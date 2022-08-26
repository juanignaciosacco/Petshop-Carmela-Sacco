/* Comienza declaracion de los array de la pagina */

// Array de usuarios registrados
let listaUsuarios = []
// Creo iteracion para comenzar con el numero identificador correcto
let identificador = 0

let listaUsuarioStorage = localStorage.getItem('Usuarios')
    if (listaUsuarioStorage != null) {
        listaUsuarioStorage = JSON.parse(listaUsuarioStorage)
        for (usuario of listaUsuarioStorage) {
            listaUsuarios.push(usuario)     
            if(usuario.id > identificador){
                identificador = usuario.id
            } else {
                identificador = 0
            }}
    } else {
        identificador = 0
    }

// const persona1 = new Usuario('Juanchi', 'Sacco', '1995','a@', 'a', 1)
// listaUsuarios.push(persona1)

// Array de carrito de compras por usuario
let carrito = []

// let carritoStorage = localStorage.getItem('carrito')
// if (carritoStorage != null) {
//     carritoStorage = JSON.parse(carritoStorage)
//     carritoStorage.forEach((e) => {carrito.push(e)})
//     console.log(carrito)
// }
/* Finalizan los array de la pagina */


/* Comienzan los llamados de elementos de formulario inicio sesion y registro */
// Llamo a la ventana popup de inicio de sesion o registro
let popupRegistro = document.querySelector('.popupInicioSesion')
// Llamo al link de registro
let btnRegistro = document.querySelector('#iconoCuenta')
// Creo evento para mostrar ventana de inicio de sesion o registro de usuario
btnRegistro.onclick = (e) => {
    popupRegistro.classList.contains('oculto') ? (popupRegistro.classList.remove('oculto'), parteCarrito.classList.add('oculto')) : popupRegistro.classList.add('oculto');
}

let ingresoExitoso
let usuarioActivo
// Llamo al formulario de inicio de sesion
let formulario = document.querySelector('#formularioInicioSesion')
formulario.addEventListener('submit', iniciarSesion)

// Llamo al boton de registro del formulario
let botonRegistrarse = document.querySelector('#btnRegistrarse')
botonRegistrarse.onclick = (e) => {
        formRegistro.style.display = 'block'
        camposDeRegistro.style.display = 'block'
        formulario.style.display = 'none'
        estadoInicioSesion.classList.add('oculto')
}

// LLamo al campo de registro
let camposDeRegistro = document.querySelector('.camposDeRegistro')

// Llamo al formulario de registro
let formRegistro = document.querySelector('#formularioRegistro')
formRegistro.addEventListener('submit', registrarse)

// Llamo al mensaje de registro
let estadoInicioSesion = document.querySelector('.estadoInicioSesion')

// // Llamo al menu del usuario ingresado
let menuUsuario = document.querySelector('#menuUsuario')

// Llamo al boton para cerrar sesion
let btnCerrarSesion = document.querySelector('#btnCerrarSesion')
if (btnCerrarSesion != null) {
    btnCerrarSesion.onclick = (e) => {
        ingresoExitoso = false
        menuUsuario.style.display = 'none'
        formulario.style.display = 'flex'
        estadoInicioSesion.innerText = ''
        !parteCarrito.classList.contains('oculto') && parteCarrito.classList.add('oculto')
        listaCarrito.innerHTML = ''
        }
}

// Llamo al boton volver
let btnVolver = document.querySelector('#btnVolver')
btnVolver.onclick = (e) => {
    formulario.style.display == 'none' ? (formulario.style.display = 'block', formRegistro.style.display = 'none') : formulario.style.display = 'none'
}
/* Finalizan los llamados de elementos de formulario inicio sesion y registro */

 /* Comienza la pagina productos */

let tablaProductos = document.querySelector('#productos')
let articulo = ''
let parteCarrito = document.querySelector('#carrito')
let listaCarrito = document.querySelector('#listaCarrito')
let listaCarritoStorage = document.querySelector('#listaCarritoStorage')
let btnCarrito = document.querySelector('#btnCarrito')
let costoTotalCarro = document.querySelector('#costoTotal')
let productoEnCarro
let sumaProductos = 0
// Muestra o oculta el carrito de compras
btnCarrito.onclick = (e) => {
    parteCarrito.classList.contains('oculto') ? (parteCarrito.classList.remove('oculto'), popupRegistro.classList.add('oculto')) : parteCarrito.classList.add('oculto');
}

// Cargo los productos al html mediante fetch
fetch('productos.json')
    .then((response) => {
        return response.json();
    })
    .then((productos) => {
        productos.forEach(producto => {
            const {img, nombre, tipoAnimal, precio, id} = producto
            articulo += `<article class="col-3 mt-3">
                            <img src="${img}" alt="">
                            <div class="descripcion">
                                <h3>${nombre}</h3>
                                <p>${tipoAnimal}</p>
                                <p>Precio: $${precio}</p>
                                <p>
                            </div>
                            <input type="button" value="Agregar a carrito" id="${id}" class="btnAgregarACarrito">
                        </article>`
        })
        tablaProductos.innerHTML = articulo
        // Llamo al boton para agregar productos al carrito
        let btnsAgregarACarrito = document.querySelectorAll('.btnAgregarACarrito')
        console.log('Estoy en fetch')
        for (btn of btnsAgregarACarrito) {
            btn.onclick = (e) => {
                let idBtn = e.target.attributes.id.value
                let productoSeleccionado = productos.find(e => e.id == idBtn)
                productoSeleccionado.idComprador = usuarioActivo
                carrito.push(productoSeleccionado)
                console.log(carrito)
                localStorage.setItem('carrito', JSON.stringify(carrito))
                cargarCarrito(productoSeleccionado)
            }
        }
    })
    .catch((error) => {
        console.log(error)
    })

// Verifico si el carrito esta lleno o no 
function verificarCarroLleno(){
    let carritoStorage = localStorage.getItem('carrito')
    if (carritoStorage != null) {
        carritoStorage = JSON.parse(carritoStorage)
        filtrarStoragePorUsuario(carritoStorage)
    }
}

function filtrarStoragePorUsuario(carritoStorage){
    let carroAMostrar = []
    console.log(carroAMostrar)
    carroAMostrar = carritoStorage.map(function(e) {
        if(e.idComprador == usuarioActivo){
            return e
        } else {
            e = null
            return e
        }
    })
    let carroFiltrado = carroAMostrar.filter(Boolean)
    carroFiltrado != null ? (console.log('Entre al ok'), carrito.length = 0, carroFiltrado.forEach(e => {carrito.push(e)}), carroFiltrado.forEach(e => {cargarCarrito(e)})) : carroFiltrado.length = 0
}

function cargarCarrito(producto){
        // listaCarrito.innerHTML = ''
        const {img, nombre, precio} = producto
        productoEnCarro = `<li class="list-group-item"><p><img src="${img}" class="imgProductoEnCarrito" alt=""></p><p>${nombre}</p><p>Precio: $${precio}</p><button id="btnQuitarProducto">Quitar</button></li>`
        listaCarrito.innerHTML += productoEnCarro
}

/* Finalizan la pagina productos */

/* Comienzan las funciones */

// Creo funcion de inicio de sesion
function iniciarSesion(e){
    e.preventDefault()
    let formArray = e.target
    let email = formArray[0].value
    let contrasena = formArray[1].value
    for (usuario of listaUsuarios) {
        if (email == usuario.email && contrasena == usuario.contrasena) {
            menuUsuario.style.display = 'flex'
            popupRegistro.classList.add('oculto')
            formulario.style.display = 'none'
            usuarioActivo = usuario.id
            ingresoExitoso = true
            verificarCarroLleno()
            formulario.reset()
            swal({
                title: "Ingreso exitoso",
                icon: "success",
            })
            break
        } else {
            popupRegistro.classList.add('oculto')
            ingresoExitoso = false
            formulario.reset()
            swal({
            title: "Problemas para ingresar sesion",
            icon: "error",
            })
        }
    }
}

// Creo funcion registrarse como usuario
function registrarse(e){
    e.preventDefault()

    let ingresoExitoso = false
    let formArray = e.target
    let nombreARegistrar = formArray[0].value
    let apellidoARegistrar = formArray[1].value
    let fechaNacARegistrar = formArray[2].value
    let emailARegistrar = formArray[3].value
    let contraseñaARegistrar = formArray[4].value
    
    if (isNaN(nombreARegistrar) && isNaN(apellidoARegistrar) && caclularMayorDeEdad(fechaNacARegistrar) && emailARegistrar.includes('@')){
        identificador += 1
        let cliente = new Usuario(nombreARegistrar, apellidoARegistrar, fechaNacARegistrar, emailARegistrar, contraseñaARegistrar, identificador)
        listaUsuarios.push(cliente)
        localStorage.setItem('Usuarios', JSON.stringify(listaUsuarios))
        ingresoExitoso = true
        formRegistro.reset()
    }
    // Esta condicion entra si el registro del nuevo usuario fue correcto. 
    ingresoExitoso ? (camposDeRegistro.style.display = 'none', formulario.style.display = 'flex', popupRegistro.classList.add('oculto'), swal({title: "Registro exitoso",icon: "success"})) : (camposDeRegistro.style.display = 'block', formulario.style.display = 'none' )
}

// Creo funcion para ver si es mayor de edad
function caclularMayorDeEdad(fechaNacARegistrar) {
    let mayorDeEdad = false

    // Creo Fecha de hoy y la convierto a un array para poder compararla con la fecha de nacimiento de registro y verificar que sea mayor de edad
    const fecha = new Date()
    const anoActual = parseInt(fecha.getFullYear())
    const mesActual = parseInt(fecha.getMonth() + 1)
    const diaActual = parseInt(fecha.getDate())

    // Agarro fecha de nacimiento ingresada y la desgloco en año, mes y dia para poder compararla con la fecha actual
    const anoNacimiento = parseInt(String(fechaNacARegistrar).substring(0,4))
    const mesNacimiento = parseInt(String(fechaNacARegistrar).substring(5,7))
    const diaNacimiento = parseInt(String(fechaNacARegistrar).substring(8,10))

    let edad = anoActual - anoNacimiento

    mesActual < mesNacimiento ? edad-- : mesActual == mesNacimiento && diaActual < diaNacimiento && edad--

    edad >= 18 ? mayorDeEdad = true : mayorDeEdad = false

    return mayorDeEdad
}

/* Finalizan las funciones */

/* Comienzan los objetos */
// Creo funcion contrsuctora para crear objeto Usuario
function Usuario(nombre, apellido, fechaNac, email, contraseña, id){
    this.nombre = nombre
    this.apellido = apellido
    this.fechaNac = fechaNac
    this.email = email
    this.contrasena = contraseña
    this.id = id
}

// Creo objeto productos
function Producto(nombre, tipoAnimal, categoria, marca, cantidad, precio) {
    this.nombre = nombre
    this.tipoAnimal = tipoAnimal
    this.categoria = categoria
    this.marca = marca
    this.cantidad = cantidad
    this.precio = precio
}
/* Finalizan los objetos */

/* Comienza la creacion de objetos por defecto */