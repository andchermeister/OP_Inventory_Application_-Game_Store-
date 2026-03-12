const { Router } = require("express");
const gameStoreRouter = Router();
const gameStoreController = require("../controllers/gameStoreController");

gameStoreRouter.get("/", gameStoreController.renderIndex);
gameStoreRouter.get("/games", gameStoreController.renderGames);
gameStoreRouter.get("/developers", gameStoreController.renderDevelopers);
gameStoreRouter.get("/genres", gameStoreController.renderGenres);
gameStoreRouter.get("/newgame", gameStoreController.renderNewGameForm);
gameStoreRouter.post("/newgame", gameStoreController.addNewGame);
gameStoreRouter.get("/games/:gameId", gameStoreController.getGameById);

module.exports = gameStoreRouter;
