

document.addEventListener('DOMContentLoaded', function () {
    const productosCarrito = document.getElementById("productosCarrito");

    fetch(`https://japceibal.github.io/emercado-api/user_cart/25801.json`)
        .then(response => response.json())
        .then(cartData => {
            console.log(cartData);
            cartData.articles.forEach(product => {
                agregarProducto(product);
            

            

            });


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
                </tr>`
        


    }







});