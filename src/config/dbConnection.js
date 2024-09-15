const mongoose = require("mongoose");

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
