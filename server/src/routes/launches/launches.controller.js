const launches = require("../../modales/launches.modal");

function getAllLaunches(req, res) {
  console.log("Launches 😀", launches);
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = getAllLaunches;
