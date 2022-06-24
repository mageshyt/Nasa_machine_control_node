const mongoose = require("mongoose");

const { MongoClient, ServerApiVersion } = require("mongodb");

//! mongo url
const url = `mongodb+srv://magesh:7RGqIcc2LtRBEhXy@cluster0.8yryvm8.mongodb.net/nasa?retryWrites=true&w=majority`;

const connect_to_mongo = async () => {
  await mongoose.connect(url);
};
mongoose.connection.on("open", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting to mongo", err);
});
const close_mongo = async () => {
  await mongoose.connection.close();
};
connect_to_mongo();
module.exports = { connect_to_mongo, close_mongo };
