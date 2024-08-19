const socket = io();
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');

socket.on('updateProducts', (products) => {
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('li');
        productElement.id = `product-${product.id}`;
        productElement.innerHTML = `
            ${product.name} - $${product.price}
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
        `;
        productList.appendChild(productElement);
    });
});
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        id: Date.now(),
        name: nameInput.value,
        price: parseFloat(priceInput.value)
    };
    socket.emit('newProduct', newProduct);
    nameInput.value = '';
    priceInput.value = '';
});

function deleteProduct(productId) {
    socket.emit('deleteProduct', productId);
}
