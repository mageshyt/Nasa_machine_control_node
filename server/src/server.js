const http = require("http");

const PORT = 8000;

const app = require("./app");

const server = http.createServer(app);

const { loadPlanets } = require("./modales/planets.modal");

const startServer = async () => {
  await loadPlanets();
};
startServer();

server.listen(PORT, () => {
  console.log(`Listening to the ${PORT}`);
});
