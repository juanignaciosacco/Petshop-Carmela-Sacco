/* Comienza declaracion de los array de la pagina */

// Array de usuarios registrados
let listaUsuarios = []
// Creo iteracion para comenzar con el numero identificador correcto
let identificador

let listaUsuarioStorage = localStorage.getItem('Usuarios')
    if (listaUsuarioStorage != null) {
        listaUsuarioStorage = JSON.parse(listaUsuarioStorage)
        for (usuario of listaUsuarioStorage) {
            listaUsuarios.push(usuario)
        }
    } else {
        identificador = 0
    }

const persona1 = new Usuario('Juanchi', 'Sacco', '1995','a@', 'a', 1)
listaUsuarios.push(persona1)

// const productos = [{
//     img: "img/Productos/Camas/Cama1.jpg",
//     nombre: "Cama 1",
//     tipoAnimal: "Perro",
//     categoria: "Desanso",
//     precio: 1000,
//     id: 1
// },{
//     img: "img/Productos/Camas/Cama2.png",
//     nombre: "Cama 2",
//     tipoAnimal: "Perro",
//     categoria: "Desanso",
//     precio: 2000,
//     id: 2
// },{
//     img: "img/Productos/Camas/Cama3.png",
//     nombre: "Cama 3",
//     tipoAnimal: "Perro",
//     categoria: "Desanso",
//     precio: 1500,
//     id: 3
// },{
//     img: "img/Productos/Camas/Cama4.jpg",
//     nombre: "Cama 4",
//     tipoAnimal: "Gato",
//     categoria: "Desanso",
//     precio: 3000,
//     id: 4
// },{
//     img: "img/Productos/Camas/Cama5.jpeg",
//     nombre: "Cama 5",
//     tipoAnimal: "Perro",
//     categoria: "Desanso",
//     precio: 2500,
//     id: 5
// },{
//     img: "img/Productos/Camas/Cama6.jpeg",
//     nombre: "Cama 6",
//     tipoAnimal: "Gato",
//     categoria: "Desanso",
//     precio: 1000,
//     id: 6
// },{
//     img: "img/Productos/Correas/Correa1.jpg",
//     nombre: "Correa 1",
//     tipoAnimal: "Gato",
//     categoria: "Paseo",
//     precio: 500,
//     id: 7
// },{
//     img: "img/Productos/Correas/Correa2.jpg",
//     nombre: "Correa 2",
//     tipoAnimal: "Perro",
//     categoria: "Paseo",
//     precio: 700,
//     id: 8
// },{
//     img: "img/Productos/Juguetes/Juguete1.jpg",
//     nombre: "Juguete 1",
//     tipoAnimal: "Perro",
//     categoria: "Juegos",
//     precio: 1300,
//     id: 9
// },{
//     img: "img/Productos/Juguetes/Juguete2.jpg",
//     nombre: "Juguete 2",
//     tipoAnimal: "Perro",
//     categoria: "Juegos",
//     precio: 1800,
//     id: 10
// },{
//     img: "img/Productos/Juguetes/Juguete3.jpg",
//     nombre: "Juguete 3",
//     tipoAnimal: "Gato",
//     categoria: "Juegos",
//     precio: 900,
//     id: 11
// },{
//     img: "img/Productos/Juguetes/Juguete4.jpg",
//     nombre: "Juguete 4",
//     tipoAnimal: "Gato",
//     categoria: "Juegos",
//     precio: 1400,
//     id: 12
// },{
//     img: "img/Productos/Transportadores/Transportador1.jpg",
//     nombre: "Transportador 1",
//     tipoAnimal: "Gato",
//     categoria: "Transporte",
//     precio: 4000,
//     id: 13
// },{
//     img: "img/Productos/Transportadores/Transportador2.jpg",
//     nombre: "Transportador 2",
//     tipoAnimal: "Gato",
//     categoria: "Transporte",
//     precio: 6000,
//     id: 14
// },{
//     img: "img/Productos/Transportadores/Transportador3.jpg",
//     nombre: "Transportador 3",
//     tipoAnimal: "Perro",
//     categoria: "Transporte",
//     precio: 7000,
//     id: 15
// },{
//     img: "img/Productos/Transportadores/Transportador4.jpg",
//     nombre: "Transportador 4",
//     tipoAnimal: "Perro",
//     categoria: "Transporte",
//     precio: 8000,
//     id: 16
// }
// ]

// Array de carrito de compras por usuario
let carrito = []
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
        productoEnCarro = ''
        listaCarrito.innerHTML = productoEnCarro
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
let btnCarrito = document.querySelector('#btnCarrito')
let productoEnCarro
let costoTotalCarro = document.querySelector('#costoTotal')
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
        console.log('Estoy en el fetch')
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
        for (btn of btnsAgregarACarrito) {
            btn.onclick = (e) => {
                console.log(carrito)
                let idBtn = e.target.attributes.id.value
                let productoSeleccionado = productos.find(e => e.id == idBtn)
                productoSeleccionado.idComprador = usuarioActivo
                carrito.push(productoSeleccionado)
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
    for(producto of carritoStorage){
        console.log(producto)
    }
    carroAMostrar = carritoStorage.map(function(e) {
        if(e.idComprador == usuarioActivo){
            return e
        } else {
            e = null
            return e
        }
    })
    console.log(carroAMostrar)
    !carroAMostrar.includes(null) ? (carrito.length = 0, carroAMostrar.forEach(e => {cargarCarrito(e)})) : carroAMostrar.length = 0
}

function cargarCarrito(producto){
        const {img, nombre, precio} = producto
        productoEnCarro += `<li class="list-group-item"><p><img src="${img}" class="imgProductoEnCarrito" alt=""></p><p>${nombre}</p><p>Precio: $${precio}</p><button id="btnQuitarProducto">Quitar</button></li>`
        listaCarrito.innerHTML = productoEnCarro
}

// function calcularTotal(){
//     for(producto of carrito){
//         sumaProductos += producto.precio
//         // costoTotalCarro
//     }
//     console.log(sumaProductos)
// }

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
            formulario.reset()
            verificarCarroLleno()
            // agregarProductoACarrito()
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

// Creo funcion mostrar campos de registro
// function mostrarCamposDeRegistro(e){
//         formRegistro.style.display = 'block'
//         camposDeRegistro.style.display = 'block'
//         formulario.style.display = 'none'
//         estadoInicioSesion.classList.add('oculto')
// }

for (usuario of listaUsuarios) {
    if(usuario.id > identificador){
        identificador = usuario.id
    } else {
        identificador = 0
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
    ingresoExitoso ? (camposDeRegistro.style.display = 'none', formulario.style.display = 'flex', popupRegistro.classList.add('oculto'), swal({title: "Registro exitoso",icon: "success",})) : (camposDeRegistro.style.display = 'block', formulario.style.display = 'none' )
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