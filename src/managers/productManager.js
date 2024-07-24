const fs = require("fs").promises;

class ProductManager {
  static ultId = 0
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadArray();
  }

  async loadArray() {
    try {
      this.products = await this.readFile();
    } catch (error) {
      console.log("Error al inicializar ProductManager");
    }
  }

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    const existingProduct = this.products.find(
      (p) => p.code === product.code
    );
    if (existingProduct) {
      console.log("El código ya está en uso");
      return;
    }

    const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    const newProduct = { id: lastProductId + 1, ...product };

    this.products.push(newProduct);

    await this.saveFile(this.products);
  }


  async getProducts() {
    try {
      const arrayProducts = await this.readFile();
      return arrayProducts;
    }
    catch (error) {
      console.log("Error al obtener productos", error);
    };
  }



  async getProducts(id) {
    try {
      const arrayProducts = await this.readFile();
      const wanted = arrayProducts.find(product => product.id == id);

      if (!wanted) {
        console.log("Not found");
        return null;
      } else {
        return wanted;
      }
    }
    catch (error) {
      console.log("Error al obtener productos", error);
    };
  };
  //update
  async upgradeProduct(id, updatedProduct) {
    try {
      const arrayProducts = await this.readFile();
      const index = arrayProducts.findIndex(product => product.id == id);

      if (index === -1) {
        console.log("No encontrado");
        return null;
      }

      arrayProducts[index] = { ...arrayProducts[index], ...updatedProduct };
      await this.saveFile(arrayProducts);
    }
    catch (error) {
      console.log("Error al actualizar producto", error);
    };
  };
//delete
  async deleteProduct(id) {
    try {
      const arrayProducts = await this.readFile();
      const filteredProducts = arrayProducts.filter(product => product.id != id);
      await this.saveFile(filteredProducts);
    }
    catch (error) {
      console.log("Error al eliminar producto", error);
    };
  };


}
module.exports = ProductManager;