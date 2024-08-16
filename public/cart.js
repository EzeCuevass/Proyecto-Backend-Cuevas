const socket = io();
console.log(localStorage);
if (localStorage.length==0){
    socket.emit('cart')
    socket.on('cartFront', async(cart)=>{
        console.log(cart);
        localStorage.setItem("id", cart._id)
    })
} else {
    let carrito = document.getElementById("carrito")
    const idCart = localStorage.getItem("id")
    carrito.innerHTML = `<a href="/carts/:cid?id=${idCart}"><p> Ver Carrito </p></a>`
}
function addProdToCart(prodId) {
    const cartId = localStorage.getItem("id");
    socket.emit('addProductToCart', { cartId, prodId });
    console.log("Producto añadido al carrito.");
}
