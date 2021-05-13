const router = require("express").Router();
const Customer = require("../model/customer.model");

// router.route("/").get((req, res) => {
//   Customer.find()
//     .then((customers) => res.json(customers))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/:id").get((req, res) => {
//   Customer.findOne({ phoneNumber: req.params.id })
//     .then((customers) => res.json(customers))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/:id").delete((req, res) => {
  Customer.findOneAndDelete({ phoneNumber: req.params.id })
    .then((customers) => res.json("Customer Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const newCustomer = new Customer(req.body);

  newCustomer
    .save()
    .then(() => res.json("Customer Added Succesfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/:id").post((req, res) => {
//   Customer.findOne({ phoneNumber: req.params.id })
//     .then((customer) => {
//       customer = req.body;

//       customer
//         .save()
//         .then(() => res.json("Customer updated"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
