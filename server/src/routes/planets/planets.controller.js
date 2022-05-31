const { planets } = require("../../modales/planets.modal");

function getAllPlanets(req, res) {
  console.log("getAllPlanets 😀");

  return res.status(200).json(planets);
}

module.exports = getAllPlanets;
