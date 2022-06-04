const express = require("express");

const {
  httpGetAllLaunches,
  httpSetLaunches,
} = require("./launches.controller");

const launchRoutes = express.Router();

launchRoutes.get("/", httpGetAllLaunches);

launchRoutes.post("/", httpSetLaunches);

module.exports = launchRoutes;
