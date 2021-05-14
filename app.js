const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./src/config/dbConnection");

const productRouter = require("./src/routes/product.routes");
const categoryRouter = require("./src/routes/category.routes");
const checkoutRouter = require("./src/routes/checkout.routes");
const transactionRouter = require("./src/routes/transaction.routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/checkout", checkoutRouter);
app.use("/transaction", transactionRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
