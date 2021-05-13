const router = require("express").Router();
const Product = require("../model/product.model");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Product.findOne({ productId: req.params.id })
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/:id").delete((req, res) => {
//   Product.findOneAndDelete({ categoryId: req.params.id })
//     .then((products) => res.json("Product Deleted"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/").post((req, res) => {
//   const newProduct = new Product(req.body);

//   newProduct
//     .save()
//     .then(() => res.json("Product Added Succesfully"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/:id").post((req, res) => {
//   Product.findOne({ categoryId: req.params.id })
//     .then((product) => {
//       product = req.body;

//       product
//         .save()
//         .then(() => res.json("Product updated"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
