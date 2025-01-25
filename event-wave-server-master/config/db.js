const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => {
      console.log(`mongodb connection......!!!`);
    })
    .catch((e) => {
      console.log(e);
    })
};
