import { Router } from "express";
const router = Router();
import CartManager from "../managers/CartManager.js";
const cartManager = new CartManager("./src/data/carts.json");
//post
router.post("/", async (req, res) => {
    try {
        const newCart = cartManager.createCart();
        res.json(newCart);
        console.log("carrito creado");
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    let cartId = parseInt(req.params.cid);
    let productId = parseInt(req.params.pid);
    let quantity = parseInt(req.body.quantity) || 1;
    try {
       const result = await cartManager.addProductToCart(cartId, productId, quantity);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});




//get
router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartById(cartId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
})


export default router;