const express = require("express");

const app = express();

const planetsRouter = require("./planets/planets.router");

const launchRoutes = require("./launches/launches.router");

const api = express.Router();

//! get planets Routes
api.use("/planets", planetsRouter);
//! launches Routes
api.use("/launches", launchRoutes);

module.exports = api;
