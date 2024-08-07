import { Router } from "express";
const router = Router();
import CartManager from "../managers/CartManager.js";
const cartManager = new CartManager("./src/data/carts.json");


router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
        console.log("Cart created");
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
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
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartById(cartId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
