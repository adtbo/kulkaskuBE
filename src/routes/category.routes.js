const router = require("express").Router();
const Category = require("../model/category.model");

router.route("/").get((req, res) => {
  Category.find()
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Category.findOne({ categoryId: req.params.id })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/:id").delete((req, res) => {
//   Category.findOneAndDelete({ categoryId: req.params.id })
//     .then((categories) => res.json("Category Deleted"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/").post((req, res) => {
//   const newCategory = new Category(req.body);

//   newCategory
//     .save()
//     .then(() => res.json("Category Added Succesfully"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/:id").post((req, res) => {
//   Category.findOne({ categoryId: req.params.id })
//     .then((category) => {
//       category = req.body;

//       category
//         .save()
//         .then(() => res.json("Category updated"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
