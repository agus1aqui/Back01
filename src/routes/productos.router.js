 import { Router } from "express";
 const router = Router();
 const express = require("express");
 import { json } from "express";

  //Array de productos
 const productos = [
     { id: 1, nombre: "Producto A", precio: 10, descripcion: "", codigo: "", stock: 1, category: "", status: true, thumbnails: [] },
     { id: 2, nombre: "Producto B", precio: 20, descripcion: "", codigo: "", stock: 1, category: "", status: true, thumbnails: [] },
     { id: 3, nombre: "Producto C", precio: 30, descripcion: "", codigo: "", stock: 1, category: "", status: true, thumbnails: [] },
     { id: 4, nombre: "Producto D", precio: 40, descripcion: "", codigo: "", stock: 1, category: "", status: true, thumbnails: [] },
     { id: 5, nombre: "Producto E", precio: 50, descripcion: "", codigo: "", stock: 1, category: "", status: true, thumbnails: [] },
 ];

  //Ruta productos
 router.get("/", (req, res) => {
     res.send(productos);
 });

  //Ruta find
 router.get("/:id", (req, res) => {
     const id = Number(req.params.id);
     const producto = productos.find((producto) => producto.id === id);
     if (producto) {
         res.json(producto);
     } else {
         res.status(404).json({ error: "Producto no encontrado" });
     }
 });

//Ruta post
 router.post("/", (req, res) => {
     const nuevoProducto = req.body;
     productos.push(nuevoProducto);
     res.send({ status: "success", message: "Nuevo producto agregado" });
 });

  //Ruta put
 router.put("/productos/:id", (req, res) => {
     const id = Number(req.params.id);
     const { nombre, precio } = req.body;
     const indice = productos.findIndex((producto) => producto.id === id);
     if (indice !== -1) {
         productos[indice].nombre = nombre;
         productos[indice].precio = precio;
         res.send({ status: "success", message: "producto actulizado" });
     } else {
         res.status(404).json({ error: "Producto no encontrado" });
     }
 });
  //Ruta dellete
 router.delete("/:pid", (req, res) => {
     const pid = Number(req.params.pid);
     const productoIndex = productos.findIndex((producto) => producto.id === pid);

     if (productoIndex !== -1) {
         productos.splice(productoIndex, 1);
         res.json({ status: "success", message: "Producto eliminado" });
     } else {
         res.status(404).json({ error: "Producto no encontrado" });
     }
 });



