const mongoose = require("mongoose");

const app = require("../app");

const { DB_HOST, PORT = 8787 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    return app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
