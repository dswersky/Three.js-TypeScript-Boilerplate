const express = require("express");
const router = express.Router();
const controller = require("./file.controller");

let routes = (app) => {
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  app.use(router);
};

module.exports = routes;