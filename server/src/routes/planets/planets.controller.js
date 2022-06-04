const { getAllPlanets } = require("../../modales/planets.modal");

function httpGetAllPlanets(req, res) {
  console.log("getAllPlanets 😀");

  return res.status(200).json(getAllPlanets());
}

module.exports = { httpGetAllPlanets };
