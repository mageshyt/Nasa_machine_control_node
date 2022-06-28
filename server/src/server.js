const http = require("http");

require("dotenv").config();

const PORT = 8000;

const app = require("./app");

const server = http.createServer(app);

const { mongoConnect } = require("./servers/mongo");

const { loadPlanets } = require("./model/planets.modal");
const { loadLaunchDate } = require("./model/launches.modal");
const startServer = async () => {
  // //! connecting
  const client = await mongoConnect();
  await loadPlanets();
  await loadLaunchDate();
};
startServer();

server.listen(PORT, () => {
  console.log(`Listening to the ${PORT}`);
});
