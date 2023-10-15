

document.addEventListener('DOMContentLoaded', function () {
    const productosCarrito = document.getElementById("productosCarrito");

    fetch(`https://japceibal.github.io/emercado-api/user_cart/25801.json`)
        .then(response => response.json())
        .then(cartData => {
            console.log(cartData);
            cartData.articles.forEach(product => {
                agregarProductoFecheado(product);
            });
        })
        .catch(error => {
            console.error("La solicitud no se completó correctamente", error);
        });

        function agregarProductoFecheado(producto){

            agregarProducto(producto.name,producto.currency,producto.image,producto.unitCost,producto.count)

        }


    function agregarProducto(nombre,moneda,imagen,costoUnitario,cantidad) {

        let inputcart= document.createElement("input");
        inputcart.value=cantidad;
        inputcart.placeholder=inputcart.value;
        inputcart.classList.add("text-center","small-input-carrito");

        productosCarrito.innerHTML +=`
                <tr class=text-center>
                    <th><img id="imageCart" src=${imagen}></th>
                    <td>${nombre}</td>
                    <td>${moneda +" "+ costoUnitario}</td>
                    <td>${inputcart.outerHTML}</td>
                    <td class="negrita">${moneda +" "+(cantidad * costoUnitario)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>`;
    }

});