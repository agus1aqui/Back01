const express = require("express");
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/products.json");
const router = express.Router();


const readProductsFromFile = async () => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file:", error);
        return [];
    }
};


const writeProductsToFile = async (products) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error("Error writing file:", error);
    }
};


router.get("/", async (req, res) => {
    const limit = req.query.limit;
    try {
        const arrayProducts = await manager.getProducts();
        if (limit) {
            res.send(arrayProducts.slice(0, limit));
        } else {
            res.send(arrayProducts);
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

// Ruta find
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const products = await readProductsFromFile();
    const product = products.find((product) => product.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

// Ruta post
router.post("/", async (req, res) => {
    const newProduct = req.body;
    const products = await readProductsFromFile();
    products.push(newProduct);
    await writeProductsToFile(products);
    res.send({ status: "success", message: "New product added" });
});

// Ruta put
router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, price } = req.body;
    const products = await readProductsFromFile();
    const indice = products.findIndex((product) => product.id === id);
    if (indice !== -1) {
        products[indice].name = name;
        products[indice].price = price;
        await writeProductsToFile(products);
        res.send({ status: "success", message: "Updated product" });
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

// Ruta delete
router.delete("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
    const products = await readProductsFromFile();
    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        await writeProductsToFile(products);
        res.json({ status: "success", message: "Product removed" });
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

module.exports = router;
