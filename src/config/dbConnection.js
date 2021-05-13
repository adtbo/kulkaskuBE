const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established");
});

module.exports = connection;
