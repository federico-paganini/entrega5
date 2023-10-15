

document.addEventListener('DOMContentLoaded', function () {
    const productosCarrito = document.getElementById("productosCarrito");

    fetch(`https://japceibal.github.io/emercado-api/user_cart/25801.json`)
        .then(response => response.json())
        .then(cartData => {
            console.log(cartData);
            cartData.articles.forEach(product => {
                agregarProducto(product);
            });
        /* const infoProducto = JSON.parse(localStorage.getItem('infoProducto')) || [];
        console.log('Datos del carrito:', infoProducto); // Verificar datos en consola
        infoProducto.forEach((DatosProducto) => {
        agregarProductoNuevo(DatosProducto);
            });*/
        })
        .catch(error => {
            console.error("La solicitud no se completó correctamente", error);
        });

    function agregarProducto(producto) {

        let inputcart= document.createElement("input");
        inputcart.value=producto.count;
        inputcart.placeholder=inputcart.value;
        inputcart.classList.add("text-center","small-input-carrito");

        productosCarrito.innerHTML +=`
                <tr class=text-center>
                    <th><img id="imageCart" src=${producto.image}></th>
                    <td>${producto.name}</td>
                    <td>${producto.currency +" "+ producto.unitCost}</td>
                    <td>${inputcart.outerHTML}</td>
                    <td class="negrita">${producto.currency +" "+(producto.count * producto.unitCost)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>`;
    }
    //Agregar nuevo producto al carrito
    /*function agregarProductoNuevo(producto) {
        let inputcart = document.createElement("input");
        inputcart.value = producto.cantidad;
        inputcart.placeholder = inputcart.value;
        inputcart.classList.add("text-center", "small-input-carrito");

        productosCarrito.innerHTML += `
            <tr class="text-center">
                <th><img id="imageCart" src=${producto.imagen}></th>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${inputcart.outerHTML}</td>
                <td class="negrita">${producto.precio * producto.cantidad}</td>
                <td>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>`;
    }*/
});