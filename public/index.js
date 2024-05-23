const socket = io();
const form = document.getElementById("form")
const title = document.getElementById("title")
const description = document.getElementById("description")
const price = document.getElementById("price")
const thumbnail = document.getElementById("thumbnail")
const code = document.getElementById("code")
const stock = document.getElementById("stock")
const categories = document.getElementById("categories")

form.onsubmit( (e)=> {
    e.preventDefault();
    console.log(e);
    const inputTitle = title.value;
    const inputDesc = description.value;
    const inputPrice = price.value;
    const inputThumb = thumbnail.value;
    const inputCode = code.value;
    const inputStock = stock.value;
    const inputCategories = categories.value;
    const newProduct = {
        inputTitle,
        inputDesc,
        inputPrice,
        inputThumb,
        inputCode,
        inputStock,
        inputCategories
    }
    console.log(newProduct);
    socket.emit('newProduct', newProduct);
})