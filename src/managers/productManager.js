const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadArray();
  }

  async loadArray() {
    try {
      this.products = await this.readFile();
      ProductManager.ultId = this.products.length > 0
        ? this.products[this.products.length - 1].id
        : 0;
    } catch (error) {
      console.log("Error starting ProductManager", error);
    }
  }

  async addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.code || !product.stock) {
      console.log("all fields are required");
      return;
    }

    const existingProduct = this.products.find(p => p.code === product.code);
    if (existingProduct) {
      console.log("The code is in use");
      return;
    }

    const newProduct = { id: ++ProductManager.ultId, ...product };
    this.products.push(newProduct);

    await this.saveFile(this.products);
  }

  async getProducts() {
    try {
      const arrayProducts = await this.readFile();
      return arrayProducts;
    } catch (error) {
      console.log("Error getting products", error);
    }
  }

  async getProductById(id) {
    try {
      const arrayProducts = await this.readFile();
      const wanted = arrayProducts.find(product => product.id == id);

      if (!wanted) {
        console.log("Not found");
        return null;
      } else {
        return wanted;
      }
    } catch (error) {
      console.log("Error getting products", error);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const arrayProducts = await this.readFile();
      const index = arrayProducts.findIndex(product => product.id == id);

      if (index === -1) {
        console.log("not found");
        return null;
      }

      arrayProducts[index] = { ...arrayProducts[index], ...updatedProduct };
      await this.saveFile(arrayProducts);
    } catch (error) {
      console.log("Error updating product", error);
    }
  }

  async deleteProduct(id) {
    try {
      const arrayProducts = await this.readFile();
      const filteredProducts = arrayProducts.filter(product => product.id != id);
      await this.saveFile(filteredProducts);
    } catch (error) {
      console.log("Error deleting product", error);
    }
  }

  async readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error reading file", error);
      return [];
    }
  }

  async saveFile(products) {
    try {
      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    } catch (error) {
      console.log("Error writing file", error);
    }
  }
}

module.exports = ProductManager;
