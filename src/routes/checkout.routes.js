const router = require("express").Router();
const Customer = require("../model/customer.model");
const Transaction = require("../model/transaction.model");
const sendEmail = require("../services/checkout.services");

router.route("/").post(async (req, res) => {
  let newCustomer = req.body.customer;
  if (!newCustomer?.phoneNumber) {
    return res.status(400).json("phone number is required");
  }

  if (newCustomer.phoneNumber[0] === "0") {
    const phoneNumber = newCustomer.phoneNumber;
    const newPhoneNumber = `62${phoneNumber.slice(1, phoneNumber.length)}`;
    newCustomer.phoneNumber = newPhoneNumber;
  }

  const today = new Date();
  const date = `${today.getDate()}${today.getMonth() + 1}${today
    .getFullYear()
    .toString()
    .slice(-2)}`;
  const transactionId = `${newCustomer.phoneNumber.slice(-3)}${date}`;
  const newTransaction = new Transaction({
    transactionId: transactionId,
    phoneNumber: newCustomer.phoneNumber,
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

    sendEmail({
      customer: newCustomer,
      products: req.body.products,
      transactionId: transactionId,
    });

    res.json("Transaction have been added");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
