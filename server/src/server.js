const http = require("http");

const PORT = 8000;

const app = require("./app");

const server = http.createServer(app);


const { connect_to_mongo } = require("./servers/mongo");

const { loadPlanets } = require("./modales/planets.modal");

const startServer = async () => {
  // //! connecting
  const client = await connect_to_mongo();
  await loadPlanets();
};
startServer();

server.listen(PORT, () => {
  console.log(`Listening to the ${PORT}`);
});
