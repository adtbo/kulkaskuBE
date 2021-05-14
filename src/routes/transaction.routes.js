const router = require("express").Router();
const Transaction = require("../model/transaction.model");

router.route("/").get((req, res) => {
  Transaction.find()
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Transaction.findOne({ transactionId: req.params.id })
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/:id").delete((req, res) => {
//   Transaction.findOneAndDelete({ transactionId: req.params.id })
//     .then((transactions) => res.json("Transaction Deleted"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/").post((req, res) => {
//   const newTransaction = new Transaction(req.body);

//   newTransaction
//     .save()
//     .then(() => res.json("Transaction Added Succesfully"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/:id").post((req, res) => {
//   Transaction.findOne({ transactionId: req.params.id })
//     .then((transaction) => {
//       transaction = req.body;

//       transaction
//         .save()
//         .then(() => res.json("Transaction updated"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
