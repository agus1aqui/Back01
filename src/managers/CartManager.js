
const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.ultId = 0;

        this.getCarts();
    }

    async getCarts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);

            if (this.carts.length > 0) {
                this.ultId = Math.max(...this.carts.map(cart => cart.id));
            }


        } catch (error) {
            await this.saveCarts();
        }
    }

    async saveCarts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error("Error saving carts:", error);
        }
    }
    createCart() {
        const newCart = {
            id: ++this.ultId,
            products: []
        };

        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }
    async getCartById(id) {
        try {
            const carts = await this.getCarts();
            return carts.find(cart => cart.id === id);
        } catch (error) {
            console.error("Error searching for product with ID:", error);
            return null;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId);
            if (!cart) {
                return "Cart not found";
            }

            const productIndex = cart.products.findIndex(product => product.productId === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }

            await this.saveCarts();
            return "Product added to the cart";
        } catch (error) {
            console.error("Error adding product to the cart", error);
            return "Error adding product to the cart";
        }
    }

}

module.exports = CartManager;

