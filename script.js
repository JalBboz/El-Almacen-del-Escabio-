$(document).ready(function() {
    // Arreglo para almacenar los productos en el carrito
    
    // Al hacer clic en la imagen del carrito, muestra u oculta el menú del carrito
    $('#carrito-icono').click(function() {
        $('#carrito').slideToggle(); // Alternar la visibilidad del menú del carrito
    });

    // Función para mostrar el carrito
    function mostrarCarrito() {
        // Selecciona la tabla del carrito
        const tbody = $('#lista-carrito tbody');
        // Limpia el contenido previo de la tabla
        tbody.empty();

        let total = 0;

        // Recorre el arreglo del carrito y agrega cada producto a la tabla
        carrito.forEach((producto) => {
            const { id, imagen, nombre, precio, cantidad } = producto;
            const subtotal = precio * cantidad;
            total += subtotal;
            const row = `
                <tr>
                    <td><img src="${imagen}" alt="${nombre}" style="width: 100px;"></td>
                    <td>${nombre}</td>
                    <td>$${precio.toFixed(2)}</td>
                    <td>
                        <input type="number" min="1" value="${cantidad}" class="cantidad" data-id="${id}">
                    </td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td>
                        <button class="borrar-producto" data-id="${id}">Eliminar</button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });

        // Actualiza el total en el HTML
        $('#total').text('$' + total.toFixed(2));
    }

    // Agrega un producto al carrito
    $('.agregar-carrito').click(function(e) {
        e.preventDefault();
        const idProducto = parseInt($(this).data('id'));
        const producto = encontrarProductoPorId(idProducto);

        if (producto) {
            producto.cantidad += 1; // Aumenta la cantidad si el producto ya está en el carrito
        } else {
            // Si el producto no está en el carrito, lo agrega
            const nombre = $(this).siblings('h3').text();
            const precio = parseFloat($(this).siblings('.Precio').text().substring(1));
            const imagen = $(this).closest('.box').find('img').attr('src');
            const nuevoProducto = {
                id: idProducto,
                nombre: nombre,
                precio: precio,
                cantidad: 1,
                imagen: imagen
            };
            carrito.push(nuevoProducto);
        }
        mostrarCarrito();
    });

    // Elimina un producto del carrito
    $('#lista-carrito').on('click', '.borrar-producto', function(e) {
        e.preventDefault();
        const idProducto = parseInt($(this).data('id'));
        carrito = carrito.filter((producto) => producto.id !== idProducto);
        mostrarCarrito();
    });

    // Actualiza la cantidad de un producto en el carrito
    $('#lista-carrito').on('change', '.cantidad', function() {
        const nuevaCantidad = parseInt($(this).val());
        const idProducto = parseInt($(this).data('id'));
        const producto = encontrarProductoPorId(idProducto);
        if (producto && !isNaN(nuevaCantidad) && nuevaCantidad >= 1) {
            producto.cantidad = nuevaCantidad;
            mostrarCarrito();
        } else {
            // Restaura la cantidad anterior si se ingresa un valor inválido
            $(this).val(producto.cantidad);
        }
    });

    // Encuentra un producto en el carrito por su ID
    function encontrarProductoPorId(id) {
        return carrito.find((producto) => producto.id === id);
    }

    // Inicializa el carrito al cargar la página
    mostrarCarrito();
});



// Enviar pedido por WhatsApp
document.getElementById('enviar-whatsapp').addEventListener('click', function() {
    var mensaje = 'Pedido:\n';
    var totalPedido = 0;
    var productos = document.querySelectorAll('#lista-carrito tbody tr');
    productos.forEach(function(producto) {
        var nombre = producto.querySelector('td:nth-child(2)').textContent.trim();
        var precioUnitario = parseFloat(producto.querySelector('td:nth-child(3)').textContent.trim().replace('$', ''));
        var cantidad = parseInt(producto.querySelector('input[type="number"]').value.trim());
        var precioFinal = precioUnitario * cantidad;
        totalPedido += precioFinal;
        mensaje += nombre + ' - Cantidad: ' + cantidad + ' - Precio Unitario: $' + precioUnitario.toFixed(2) + ' - Precio Final: $' + precioFinal.toFixed(2) + '\n';
    });
    mensaje += '\nTotal del pedido: $' + totalPedido.toFixed(2);
    var mensajeWhatsApp = encodeURIComponent(mensaje);
    window.location.href = 'https://wa.me/5491151765221/?text=' + mensajeWhatsApp;
});



$(document).ready(function() {
    // Función para mostrar el contenido del carrito
    $('#carrito-icono').click(function() {
        $('#carrito-content').fadeIn();
    });

    // Función para ocultar el contenido del carrito al hacer clic en el botón "Cerrar"
    $('#cerrar-carrito').click(function() {
        $('#carrito-content').fadeOut();
    });

    // Obtener el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Mostrar los productos del carrito en la página
    const listaCarrito = $('#lista-carrito');
    listaCarrito.empty();
    carrito.forEach(producto => {
        listaCarrito.append(`<p>${producto.nombre}</p>`);
    });

    

    
});
let carrito = [];
try {
    const carritoJSON = localStorage.getItem('carrito');
    if (carritoJSON !== null) {
        carrito = JSON.parse(carritoJSON);
    }
} catch (error) {
    
}


document.getElementById('cerrar-carrito').addEventListener('click', function() {
    document.getElementById('contenido-carrito').style.display = 'none';
});




$(document).ready(function() {
    $('#carrito-icono').click(function() {
        $('#contenido-carrito').slideToggle('fast');
    });
});


document.getElementById('whatsapp-icono').addEventListener('click', function() {
    window.open('https://wa.me/5491151765221', '_blank');
});

$(document).ready(function() {
    var scrollStep = 200; // Cantidad de píxeles para desplazar

    $('#slide-left').click(function() {
        $('.productos-container').animate({
            scrollLeft: '-=' + scrollStep
        }, 500);
    });

    $('#slide-right').click(function() {
        $('.productos-container').animate({
            scrollLeft: '+=' + scrollStep
        }, 500);
    });
});

// Mostrar el mensaje al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    var mensaje = document.getElementById('mensaje');
    mensaje.style.display = 'block'; // Mostrar el mensaje
});

