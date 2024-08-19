const router = require("express").Router();
const products = require("..//data/products.json");



router.get("/", (req, res) => {
    res.render("index", { products });
});

router.get("/products", (req, res) => {
    res.render("products");
});
router.get(/realtimeproducts/, (req, res) => {
    res.render("realtimeproducts", { products });
})








module.exports = router;