// Array de usuarios registrados
let listaUsuarios = []
let carrito = []
// Llamo a la ventana popup de inicio de sesion o registro
let popupRegistro = document.querySelector('.popupInicioSesion')
// Llamo al link de registro
let btnRegistro = document.querySelector('#iconoCuenta')
let ingresoExitoso
let usuarioActivo
// Llamo al formulario de inicio de sesion
let formulario = document.querySelector('#formularioInicioSesion')
// Llamo al boton de registro del formulario
let botonRegistrarse = document.querySelector('#btnRegistrarse')
// Llamo al mensaje de registro
let estadoInicioSesion = document.querySelector('.estadoInicioSesion')
// // Llamo al menu del usuario ingresado
let menuUsuario = document.querySelector('#menuUsuario')
// Llamo al boton para cerrar sesion
let btnCerrarSesion = document.querySelector('#btnCerrarSesion')
// LLamo al campo de registro
let camposDeRegistro = document.querySelector('.camposDeRegistro')
// Llamo al formulario de registro
let formRegistro = document.querySelector('#formularioRegistro')
// Llamo al boton volver
let btnVolver = document.querySelector('#btnVolver')
// Creo iteracion para comenzar con el numero identificador correcto
let identificador = 0
// Llamo a la tabla de productos
let tablaProductos = document.querySelector('#productos')
let articulo = ''
// Llamo al popup carrito
let parteCarrito = document.querySelector('#carrito')
// Llamo a la lista carrito
let listaCarrito = document.querySelector('#listaCarrito')
// Llamo al boton para mostrar el carrito
let btnCarrito = document.querySelector('#btnCarrito')
let productoEnCarro
// Creo array de productos seleccionados por usuario
let productoSeleccionado = []
// Traigo a la lista de usuarios del storage
let listaUsuarioStorage = localStorage.getItem('Usuarios')
// Traigo los filtors de busqueda para los productos
let filtros = document.querySelectorAll('.filtros')
// Creo array para cargar con los poructos filtrados
let productosFiltrados = []
// Creo variable para el array de botones
let btnsAgregarACarrito
let btnsQuitarProdCarro
// Creo verificador para los filtros
let aplicoFiltro = false
// Verifico si hay usuarios guardados en el localStorage
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
// Creo evento para mostrar ventana de inicio de sesion o registro de usuario
btnRegistro.onclick = (e) => {
    popupRegistro.classList.contains('oculto') ? (popupRegistro.classList.remove('oculto'), parteCarrito.classList.add('oculto')) : popupRegistro.classList.add('oculto');
}
// Creo evento para iniciar sesion
formulario.addEventListener('submit', iniciarSesion)
// Evento para ver campos de registro de usuario
botonRegistrarse.onclick = (e) => {
        formRegistro.style.display = 'block'
        camposDeRegistro.style.display = 'block'
        formulario.style.display = 'none'
        estadoInicioSesion.classList.add('oculto')
}
// Evento para registrase
formRegistro.addEventListener('submit', registrarse)
// Verifico si existe el boton cerrar sesion y si es asi le doy su funcionalidad
if (btnCerrarSesion != null) {
    btnCerrarSesion.onclick = (e) => {
        ingresoExitoso = false
        menuUsuario.style.display = 'none'
        formulario.style.display = 'flex'
        estadoInicioSesion.innerText = ''
        !parteCarrito.classList.contains('oculto') && parteCarrito.classList.add('oculto')
        listaCarrito.innerHTML = ''
        localStorage.setItem('carrito' + usuarioActivo, JSON.stringify(carrito))
        carrito.length = 0
        }
}
// Evento para boton volver
btnVolver.onclick = (e) => {
    formulario.style.display == 'none' ? (formulario.style.display = 'flex', formRegistro.style.display = 'none') : formulario.style.display = 'none'
}
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
        articulo += `<article class="articulo" mt-3">
                        <img src="${img}" alt="">
                        <div class="descripcion">
                            <h3>${nombre}</h3>
                            <p>${tipoAnimal}</p>
                            <p>Precio: $${precio}</p>
                            <p>
                        </div>
                        <input type="button" value="Agregar a carrito" id="${id}" class="btnAgregarACarrito btn">
                    </article>`
    })
    tablaProductos.innerHTML = articulo
    for (filtro of filtros){
        filtro.onclick = (e) =>{
            filtrarProductos(productos, e)
        } 
    }
    // Llamo al boton para agregar productos al carrito
    btnsAgregarACarrito = document.querySelectorAll('.btnAgregarACarrito')
    agregarACarrito(btnsAgregarACarrito, productos)
})
.catch((error) => {
    console.log(error)
})

// Funcion para filtrar productos
function filtrarProductos(productos, filtro){
    aplicoFiltro = true
        let valorFiltro = filtro.target.attributes[1].value
        let seleccionado = filtro.target.checked

        productos.forEach((producto) => {
            if(seleccionado && producto.categoria == valorFiltro){
                productosFiltrados.push(producto)
                console.log(productosFiltrados)
            } else if (seleccionado == false && producto.categoria == valorFiltro){
                productosFiltrados.forEach((prod) => {
                    prod.categoria == producto.categoria && delete productosFiltrados[productosFiltrados.indexOf(prod)]
                })
                productosFiltrados = productosFiltrados.filter(Boolean)
            }
        })
        tablaProductos.innerHTML = ''
        if(productosFiltrados.length != 0){
            productosFiltrados.forEach(e => {
                const {img, nombre, tipoAnimal, precio, id} = e
                articulo = `<article class="col-3 mt-3">
                                <img src="${img}" alt="">
                                <div class="descripcion">
                                    <h3>${nombre}</h3>
                                    <p>${tipoAnimal}</p>
                                    <p>Precio: $${precio}</p>
                                </div>
                                <input type="button" value="Agregar a carrito" id="${id}" class="btnAgregarACarrito btn">
                            </article>`
                tablaProductos.innerHTML += articulo
            })
            btnsAgregarACarrito = document.querySelectorAll('.btnAgregarACarrito')
            agregarACarrito(btnsAgregarACarrito, productosFiltrados)
        } else {
            productos.forEach(producto => {
                const {img, nombre, tipoAnimal, precio, id} = producto
                articulo = `<article class="col-3 mt-3">
                                <img src="${img}" alt="">
                                <div class="descripcion">
                                    <h3>${nombre}</h3>
                                    <p>${tipoAnimal}</p>
                                    <p>Precio: $${precio}</p>
                                </div>
                                <input type="button" value="Agregar a carrito" id="${id}" class="btnAgregarACarrito btn">
                            </article>`
                tablaProductos.innerHTML += articulo
            })
            btnsAgregarACarrito = document.querySelectorAll('.btnAgregarACarrito')
            agregarACarrito(btnsAgregarACarrito, carrito)
        }
}
// Funcion accion botones agregar a carrito
function agregarACarrito(botones, productos) {
    for (btn of botones) {
        btn.onclick = (e) => {
            if (ingresoExitoso){
                let idBtn = e.target.attributes.id.value
                productoSeleccionado = productos.find(e => e.id == idBtn)
                productoSeleccionado.idComprador = usuarioActivo
                carrito.push(productoSeleccionado)
                cargarCarrito(productoSeleccionado)
            } else {
                swal({
                    icon: "info",
                    text: 'Debes iniciar sesion para agregar productos al carrito!',
                    buttons: {
                        cancel: false,
                        confirm: "Iniciar sesion",
                        roll: {
                          text: "Registrarse",
                          value: "registro",
                        },
                      },
                  })
                  .then((result) => {
                    console.log(result)
                    if (result && result != "registro") {
                        popupRegistro.classList.contains('oculto') && popupRegistro.classList.remove('oculto')
                        formRegistro.style.display == 'block' && camposDeRegistro.style.display == 'block' && (formRegistro.style.display = 'none', camposDeRegistro.style.display = 'none', formulario.style.display = 'flex')
                    } else if (result == "registro") {
                        popupRegistro.classList.contains('oculto') && popupRegistro.classList.remove('oculto')
                        formRegistro.style.display = 'block'
                        camposDeRegistro.style.display = 'block'
                        formulario.style.display = 'none'
                        estadoInicioSesion.classList.add('oculto')
                    }
                  })
            }
        }
    }
}
// Esta funcion elimina producto del carrito
function quitarDeCarrito(carroNuevo){
    listaCarrito.innerHTML = ''
    carroNuevo.forEach(e => {
        cargarCarrito(e)
    })
}
// Verifico si el carrito en el storage esta lleno
function verificarCarroLleno(){
    let carritoStorage = localStorage.getItem('carrito' + usuarioActivo)
    if (carritoStorage != null) {
        carritoStorage = JSON.parse(carritoStorage)
        carritoStorage.forEach(e => {carrito.push(e), cargarCarrito(e)})
    }
}
// Imprimo el carro por pantalla
function cargarCarrito(producto){
        // listaCarrito.innerHTML = ''
        const {img, nombre, precio, id} = producto
        productoEnCarro = `<li class="list-group-item"><p><img src="${img}" class="imgProductoEnCarrito" alt=""></p><p>${nombre}</p><p>Precio: $${precio}</p><button class="btnQuitarProducto btn" id="${id}">Quitar</button></li>`
        listaCarrito.innerHTML += productoEnCarro
        btnsQuitarProdCarro = document.querySelectorAll('.btnQuitarProducto')
        for(btn of btnsQuitarProdCarro) {
            btn.onclick = (e) => {
                let idBtn = e.target.id
                let productoAQuitar = carrito.find(e => e.id == idBtn)
                carrito.splice(carrito.indexOf(productoAQuitar), 1)
                quitarDeCarrito(carrito)
            }
        }
}
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
// Creo funcion contrsuctora para crear objeto Usuario
function Usuario(nombre, apellido, fechaNac, email, contraseña, id){
    this.nombre = nombre
    this.apellido = apellido
    this.fechaNac = fechaNac
    this.email = email
    this.contrasena = contraseña
    this.id = id
}