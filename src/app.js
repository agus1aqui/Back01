const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const viewsRouter = require('./routes/views.router');
const users = require("./data/users.json")
const { socket } = require('socket.io');


const ProductManager = require("./managers/productManager.js");
const manager = new ProductManager("./src/data/products.json");

const app = express();
const PORT = 8080;


const httpServer = http.createServer(app);

const io = new Server(httpServer);


app.use(express.json());
app.use(express.static('./src/public'));
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


app.use('/', viewsRouter);


io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);
    });
    socket.emit('evento', 'Hola, cliente!');
    socket.emit('users', users)
});


httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//mensajes
//historial
let messages = [];

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        messages.push(data);

        io.emit('messageLogs', messages)
    })


});

