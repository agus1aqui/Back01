import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import fs from 'fs';
import handlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
//import mongoose from 'mongoose';
//import ProductsModel from './models/products.model.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsFilePath = path.join(__dirname, 'data', 'products.json');

const readProductsFromFile = () => {
    const data = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeProductsToFile = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

app.get('/realtimeproducts', (req, res) => {
    const products = readProductsFromFile();
    res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('newProduct', (product) => {
        const products = readProductsFromFile();
        products.push(product);
        writeProductsToFile(products);
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', (productId) => {
        let products = readProductsFromFile();
        products = products.filter(p => p.id !== productId);
        writeProductsToFile(products);
        io.emit('updateProducts', products);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
