const { Router } = require("express");
const gameStoreRouter = Router();
const gameStoreController = require("../controllers/gameStoreController");

gameStoreRouter.get("/", gameStoreController.getAllGames);

module.exports = gameStoreRouter;
