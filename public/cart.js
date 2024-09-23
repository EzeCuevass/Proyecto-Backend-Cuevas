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
    carrito.innerHTML = `<a href="/carts/:cid?id=${idCart}"><button type="button" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg> Ver Carrito </button></a>`
}
function addProdToCart(prodId) {
    const cartId = localStorage.getItem("id");
    socket.emit('addProductToCart', { cartId, prodId });
    console.log("Producto añadido al carrito.");
}
function deleteCart(){
    localStorage.removeItem("id")
}