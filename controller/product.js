const { Product } = require("../model/Product");

exports.createUser = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate key error. Document already exists!");
      res.status(400).json(error);
    } else {
      console.error("An error occurred:", error);
      res.status(400).json(error);
    }
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error, req);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.replaceProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(202).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(202).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findByIdAndDelete(id);
    res.status(204).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
