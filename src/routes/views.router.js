const router = require("express").Router();
const products = require("..//data/products.json");



router.get("/", (req, res) => {
    res.render("index", { products });
});

router.get("/products", (req, res) => {
    res.render("products");
});









module.exports = router;