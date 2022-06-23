const { getAllPlanets } = require("../../modales/planets.modal");

async function httpGetAllPlanets(req, res) {
  console.log("getAllPlanets 😀 ");

  return res.status(200).json(await getAllPlanets());
}

module.exports = { httpGetAllPlanets };



