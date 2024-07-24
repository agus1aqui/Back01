const express = require("express");
const productRouter = require("./routes/productos.router.js");
const app = express();
const PUERTO = 8080;
app.use(express.json());

app.use("/api/products", productRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})