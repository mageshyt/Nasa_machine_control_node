const { parse } = require("csv-parse");
const fs = require("fs"); //! file system
const path = require("path");
const { planets } = require("./planets.mongo");
const isHabitable = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
};

const habitable_planets = [];

const update_planet = async (planet) => {
  const { kepler_name } = planet;
  try {
    await planets.updateOne(
      {
        kepler_name,
      },
      {
        kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log("could not update ", err);
  }
};
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
      .on("data", async (data) => {
        if (isHabitable(data)) {
          habitable_planets.push(data);
          // TODO :  insert + update = upsert
          update_planet(data);
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", async () => {
        console.log(
          `${await (await getAllPlanets()).length} habitable planets found!`
        );
        resolve();
      });
  });
};

const getAllPlanets = async () => {
  return await planets.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  );
  // return habitable_planets;
};

module.exports = {
  getAllPlanets,
  loadPlanets,
};
