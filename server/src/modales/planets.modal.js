const { parse } = require("csv-parse");
const fs = require("fs"); //! file system
const path = require("path");
const isHabitable = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
};

const habitable_planets = [];

const loadPlanets = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          delimiter: ",",
          columns: true,
        })
      ) //! pipe the data to the parse function
      .on("data", (data) => {
        if (isHabitable(data)) {
          habitable_planets.push(data);
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitable_planets.length} habitable planets found!`);
        resolve();
      });
  });
};


const getAllPlanets = () => {
  return habitable_planets
}

module.exports = {
  getAllPlanets,
  loadPlanets,
};
