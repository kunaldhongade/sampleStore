const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/product");

productRouter.post("/", productController.createUser);

productRouter.get("/", productController.getAllProducts);

productRouter.get("/:id", productController.getProduct);

productRouter.put("/:id", productController.replaceProduct);

productRouter.patch("/:id", productController.updateProduct);

productRouter.delete("/:id", productController.deleteProduct);

productRouter.get("/", (req, res) => {
  res.json({ type: "GET" });
});

productRouter.post("/", (req, res) => {
  res.json({ type: "POST" });
});

productRouter.put("/", (req, res) => {
  res.json({ type: "PUT" });
});

productRouter.patch("/", (req, res) => {
  res.json({ type: "PATCH" });
});

productRouter.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});

productRouter.get("/demo", (req, res) => {
  res.json(products);
});

module.exports = productRouter;
