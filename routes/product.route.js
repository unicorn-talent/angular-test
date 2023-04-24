const express = require("express");
const router = express.Router();
const passport = require("passport");

// Product model
let Product = require("../models/Product");

// Add Product
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newProduct = new Product({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
    });

    newProduct.save().then((post) => res.json(post));
  }
);

// Get All Products
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.find({ user: req.user.id })
      .then((products) => res.json(products))
      .catch((err) => res.status(404).json(err));
  }
);

// Get Single Product
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then((product) => res.json(product))
      .catch((err) => res.status(404).json(err));
  }
);

// Update Product
router.post("/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((Product) => res.json(Product))
    .catch((err) => res.status(404).json(err));
});

// Delete Product
router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((success) => res.json(success))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
