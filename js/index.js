let stockProductos = [
  {
    id: 1,
    nombre: "Buzo 1",
    tipo: "buzo",
    cantidad: 1,
    desc: "Chaleco confeccionado en pu ,con cuello alto y cartera central con cierre y botones.",
    precio: 1200,
    talle: "L",
    img: "./img/01.jpg",
  },
  {
    id: 2,
    nombre: "Buzo 2",
    tipo: "buzo",
    cantidad: 1,
    desc: "Chaleco confeccionado en pu ,con cuello alto y cartera central con cierre y botones.",
    precio: 1100,
    talle: "L",
    img: "./img/02.jpg",
  },
  {
    id: 3,
    nombre: "Buzo 3",
    tipo: "buzo",
    cantidad: 1,
    desc: "Chaleco confeccionado en pu ,con cuello alto y cartera central con cierre y botones. ",
    precio: 1200,
    talle: "M",
    img: "./img/03.jpg",
  },

  {
    id: 6,
    nombre: "Buzo 6",
    tipo: "buzo",
    cantidad: 1,
    desc: "Chaleco confeccionado en pu ,con cuello alto y cartera central con cierre y botones.",
    precio: 1500,
    talle: "S",
    img: "./img/04.jpg",
  },
  {
    id: 7,
    nombre: "Remera 1",
    tipo: "remera",
    cantidad: 1,
    desc: "Remera estilo blusa de calce regular con manga 3/4 con trabitas para recoger.",
    precio: 500,
    talle: "L",
    img: "./img/05.jpg",
  },
  {
    id: 8,
    nombre: "Remera 2",
    tipo: "remera",
    cantidad: 1,
    desc: "Remera estilo blusa de calce regular con manga 3/4 con trabitas para recoger.",
    precio: 500,
    talle: "L",
    img: "./img/06.jpg",
  },
  {
    id: 9,
    nombre: "Remera 3",
    tipo: "remera",
    cantidad: 1,
    desc: "Remera estilo blusa de calce regular con manga 3/4 con trabitas para recoger.",
    precio: 500,
    talle: "M",
    img: "./img/07.jpg",
  },

  {
    id: 13,
    nombre: "Camisa 1",
    tipo: "camisa",
    cantidad: 1,
    desc: "Remera estilo blusa de calce regular con manga 3/4 con trabitas para recoger.",
    precio: 900,
    talle: "L",
    img: "./img/08.jpg",
  },
  {
    id: 14,
    nombre: "Camisa 2",
    tipo: "camisa",
    cantidad: 1,
    desc: "Abrigo de paño melange con solapa y cruce hasta un lado",
    precio: 1400,
    talle: "S",
    img: "./img/09.jpg",
  },
  {
    id: 15,
    nombre: "Camisa 3",
    tipo: "camisa",
    cantidad: 1,
    desc: "Abrigo de paño melange con solapa y cruce hasta un lado",
    precio: 7000,
    talle: "L",
    img: "./img/10.jpg",
  },

  {
    id: 19,
    nombre: "Pantalon 1",
    tipo: "pantalon",
    cantidad: 1,
    desc: "Abrigo de paño melange con solapa y cruce hasta un lado",
    precio: 1600,
    talle: "L",
    img: "./img/11.jpg",
  },
  {
    id: 20,
    nombre: "Pantalon 2",
    tipo: "pantalon",
    cantidad: 1,
    desc: "Jean chupín, calce slim, tela con coating símil cuero. Tiro alto.",
    precio: 3200,
    talle: "L",
    img: "./img/12.jpg",
  },
];

const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonVaciar = document.getElementById("vaciar-carrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const cantidad = document.getElementById("cantidad");
const precioTotal = document.getElementById("precioTotal");
const cantidadTotal = document.getElementById("cantidadTotal");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
});

stockProductos.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("producto");
  div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar</button>
    `;
  contenedorProductos.appendChild(div);

  const boton = document.getElementById(`agregar${producto.id}`);

  boton.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
    //
  });
});

const agregarAlCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === prodId);
    carrito.push(item);
  }

  actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);

  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarCarrito();
  console.log(carrito);
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `;

    contenedorCarrito.appendChild(div);

    localStorage.setItem("carrito", JSON.stringify(carrito));
  });

  contadorCarrito.innerText = carrito.length;

  console.log(carrito);
  precioTotal.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
};

const contenedorModal = document.getElementsByClassName("modal-contenedor")[0];
const botonAbrir = document.getElementById("boton-carrito");
const botonCerrar = document.getElementById("carritoCerrar");
const modalCarrito = document.getElementsByClassName("modal-carrito")[0];

botonAbrir.addEventListener("click", () => {
  contenedorModal.classList.toggle("modal-active");
});
botonCerrar.addEventListener("click", () => {
  contenedorModal.classList.toggle("modal-active");
});

contenedorModal.addEventListener("click", (event) => {
  contenedorModal.classList.toggle("modal-active");
});
modalCarrito.addEventListener("click", (event) => {
  event.stopPropagation(); //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
  //padre
});
