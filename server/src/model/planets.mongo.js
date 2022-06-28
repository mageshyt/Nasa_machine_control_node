const mongoose = require("mongoose");
const { Schema } = mongoose;

const planet_schema = new Schema({
  kepler_name: {
    type: String,
    required: true,
  },
});

module.exports ={
    planets: mongoose.model("Planet", planet_schema),
}
