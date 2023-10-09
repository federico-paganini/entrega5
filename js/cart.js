

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
                </tr>`;
    }

});

//Datos de los productos desde "product-info" a la página "cart"
const URL = PRODUCT_INFO_URL + localStorage.getItem("ValorID") + EXT_TYPE;

//Llamar los datos desde la URL
fetch (URL)
.then(res=>{
    if (!res.ok){
        throw new error("Hubo un error")
    }
    return res.json();
})
.then(data =>{
    console.log('Datos del producto:', data);
})
.catch(error => {
    console.error('Error de solicitud:', error);
});

const infoProducto=JSON.parse(localStorage.getItem('infoProducto')) || [];
console.log('Datos del carrito:', infoProducto); //Verificar datos en consola


infoProducto.forEach((DatosProducto)=>{
    const ValorPrecioTotal= DatosProducto.precio * DatosProducto.cantidad;
    const ProductoDiv= document.createElement("div");
    
    ProductoDiv.innerHTML = `
        <tr class="text-center">
            <th><img id="imageCart" src="${DatosProducto .imagen}"></th>
            <td>${DatosProducto .nombre}</td>
            <td>${DatosProducto .precio}</td>
            <td><input class="text-center small-input-carrito" value="${DatosProducto .cantidad}" placeholder="${DatosProducto .cantidad}"></td>
            <td class="negrita">${ValorPrecioTotal}</td>
            <td><button class="btn btn-danger btn-sm">Eliminar</button></td>
        </tr>`;
    productosCarrito.appendChild(ProductoDiv);
});