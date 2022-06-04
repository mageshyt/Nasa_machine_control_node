const express = require("express");

const {
  httpGetAllLaunches,
  httpSetLaunches,
  http_abort_the_launch,
} = require("./launches.controller");

const launchRoutes = express.Router();

launchRoutes.get("/", httpGetAllLaunches);

launchRoutes.post("/", httpSetLaunches);

launchRoutes.delete("/:id", http_abort_the_launch);

module.exports = launchRoutes;
