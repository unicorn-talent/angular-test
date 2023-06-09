const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Employee = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    collection: "employees",
  }
);

module.exports = mongoose.model("Employee", Employee);
