const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

const viewsRouter = require('./routes/views.router');
const ProductManager = require("./managers/productManager.js");
const manager = new ProductManager("./src/data/products.json");

const app = express();
const PORT = 8080;
const httpServer = http.createServer(app);
const io = new Server(httpServer);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//Routers
app.use('/', viewsRouter);


httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


io.on('connection', (socket) => {
    console.log('Usuario conectado');

   
    socket.on('newProduct', async (product) => {
        await manager.addProduct(product); 
        const updatedProducts = await manager.getProducts(); 
        io.emit('updateProducts', updatedProducts); 
    });

 
    socket.on('deleteProduct', async (productId) => {
        await manager.deleteProduct(productId); 
        const updatedProducts = await manager.getProducts();
        io.emit('updateProducts', updatedProducts);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});
