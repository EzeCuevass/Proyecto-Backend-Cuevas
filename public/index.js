
const socket = io();
const title = document.getElementById("title")
const description = document.getElementById("description")
const price = document.getElementById("price")
const thumbnail = document.getElementById("thumbnail")
const code = document.getElementById("code")
const stock = document.getElementById("stock")
const categories = document.getElementById("categories")
const form = document.getElementById("form")
const output = document.getElementById("output")

function deleteProduct(id){
    socket.emit('deleteProduct', id)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputTitle = title.value;
    const inputDesc = description.value;
    const inputPrice = price.value;
    const inputThumb = thumbnail.value;
    const inputCode = code.value;
    const inputStock = stock.value;
    const inputCategories = categories.value;
    const newProduct = {
        inputTitle:inputTitle,
        inputDesc:inputDesc,
        inputPrice:inputPrice,
        inputThumb:inputThumb,
        inputCode:inputCode,
        inputStock:inputStock,
        inputCategories:inputCategories
    }
    console.log(newProduct);
    socket.emit('newProduct', newProduct);

})
socket.on('products', (products)=>{
    output.innerHTML= products.map((product)=>{
        return `id:${product.id}<br> 
        title:${product.title}<br>
        description:${product.description}<br>
        price:${product.price}<br>
        thumbnail:${product.thumbnail}<br>
        code:${product.code}<br>
        stock:${product.stock}<br>
        categories:${product.categories}<br>
        <button onclick="deleteProduct(${product.id})">delete</button><br>
        `
    })
})