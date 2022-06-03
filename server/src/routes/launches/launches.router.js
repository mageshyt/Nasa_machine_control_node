const express = require("express");

const getAllLaunches = require("./launches.controller");

const launchRoutes = express.Router();

launchRoutes.get("/launches", getAllLaunches);

module.exports = launchRoutes;
