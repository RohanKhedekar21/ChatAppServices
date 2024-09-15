const mongoose = require("mongoose");
// require("dotenv").config({ path: __dirname + "../../.env" });

console.log(">>>>>>>>process.env.MONGO_URL", process.env.MONGO_URL);
const setupMongoConnection = () =>
  mongoose
    .set("strictQuery", true)
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connection Successfull");
    })
    .catch((err) => {
      console.log(err.message);
    });

module.exports = { setupMongoConnection };
