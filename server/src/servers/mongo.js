const mongoose = require("mongoose");

const { MongoClient, ServerApiVersion } = require("mongodb");

//! mongo url
const url = `mongodb+srv://magesh:7RGqIcc2LtRBEhXy@cluster0.8yryvm8.mongodb.net/nasa?retryWrites=true&w=majority`;

const mongoConnect = async () => {
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
module.exports = { mongoConnect, close_mongo };
