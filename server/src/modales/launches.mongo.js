const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const launches_schema = new Schema({
  flightNumber: {
    type: Number,
    required: true,
  },

  mission: {
    type: String,
    required: true,
  },

  rocket: {
    type: String,
    required: true,
  },

  launch_date_utc: {
    type: Date,
    required: true,
  },

  destination: {
    type: String,
    required: true,
  },

  target: {
    // ref: "Planet",
    type: String,
    required: true,
  },

  upcoming: {
    type: Boolean,
    required: true,
  },

  launch_success: {
    type: Boolean,
    required: true,
    default: true,
  },
  customers: [String],
});

// console.log("schema", launches_schema);

const mongoose_launch_modal = model("Launch", launches_schema);

module.exports = {
  launch_modal: mongoose_launch_modal,
};

const test_schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
