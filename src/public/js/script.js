// src/public/js/main.js
const socket = io();

// Elementos del DOM
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageUrlInput = document.getElementById('imageUrl');

// Actualiza la lista de productos en tiempo real
socket.on('updateProducts', (products) => {
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('li');
        productElement.id = `product-${product.id}`;
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" style="width: 100px; height: auto;">
            <div>
                <strong>${product.name}</strong> - $${product.price}
            </div>
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
        `;
        productList.appendChild(productElement);
    });
});

// Envía un nuevo producto al servidor
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        id: Date.now(),
        name: nameInput.value,
        price: parseFloat(priceInput.value),
        imageUrl: imageUrlInput.value
    };
    socket.emit('newProduct', newProduct);
    nameInput.value = '';
    priceInput.value = '';
    imageUrlInput.value = '';
});

// Elimina un producto
function deleteProduct(productId) {
    socket.emit('deleteProduct', productId);
}
