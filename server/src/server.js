const http = require("http");

const PORT = 8000;

const app = require("./app");

const server = http.createServer(app);

//! mongo url

const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const url = `mongodb+srv://magesh:7RGqIcc2LtRBEhXy@cluster0.8yryvm8.mongodb.net/nasa?retryWrites=true&w=majority`;

const { loadPlanets } = require("./modales/planets.modal");

mongoose.connection.on("open", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting to mongo", err);
});

const startServer = async () => {
  // //! connecting
  const client = await mongoose.connect(url);
  await loadPlanets();
};
startServer();

server.listen(PORT, () => {
  console.log(`Listening to the ${PORT}`);
});
