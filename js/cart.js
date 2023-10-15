function actualizarSubtotal(cantIngresada, costoUnitario) {
    const cantidad = cantIngresada.value;
    const impResult = cantIngresada.parentElement.parentElement.nextElementSibling;
    const moneda = impResult.innerText.split(" ")[0];
    const resultado = costoUnitario * cantidad;
    impResult.innerText = `${moneda} ${resultado}`;
}

function subTotal(costoUnitario, cantidad) {
    return costoUnitario * cantidad;
}

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


    function agregarProductoFecheado(producto) {
        agregarProducto(producto.name, producto.currency, producto.image, producto.unitCost, producto.count);
    }


    function agregarProducto(nombre, moneda, imagen, costoUnitario, cantidad) {
        const resultado = subTotal(costoUnitario, cantidad);

        productosCarrito.innerHTML += `
                <tr class="text-center">
                    <th><img id="imageCart" src=${imagen}></th>
                    <td>${nombre}</td>
                    <td>${moneda + " " + costoUnitario}</td>
                    <td>
                        <div class="form-group call">
                            <input type="number" value=${cantidad} min="1" style="width: 20%" onchange="actualizarSubtotal(this, ${costoUnitario})">
                        </div>
                    </td>
                    <td class="negrita" id="impResult">${moneda + " " + resultado}</td>
                    <td>
                        <button class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>`;
    }
});