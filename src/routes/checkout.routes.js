const router = require("express").Router();
const Customer = require("../model/customer.model");
const Transaction = require("../model/transaction.model");
const sendEmail = require("../services/checkout.services");

router.route("/").post(async (req, res) => {
  const newCustomer = req.body.customer;
  if (!newCustomer?.phoneNumber) {
    return res.status(400).json("phone number is required");
  }

  const today = new Date();
  const date = `${today.getDate()}${today.getMonth() + 1}${today
    .getFullYear()
    .toString()
    .slice(-2)}`;
  const newTransaction = new Transaction({
    transactionId: `${newCustomer.phoneNumber.slice(-3)}${date}`,
    phoneNumber: req.body.customer.phoneNumber,
    products: req.body.products,
  });

  try {
    await Customer.findOneAndUpdate(
      { phoneNumber: newCustomer.phoneNumber },
      newCustomer,
      {
        new: true,
        upsert: true,
        overwrite: true,
      }
    );
    await newTransaction.save();

    sendEmail(req.body);

    res.json("Transaction have been added");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
