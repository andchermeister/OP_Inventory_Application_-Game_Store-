const { Router } = require("express");
const gamesRouter = Router();
const gamesController = require("../controllers/gamesController");

gamesRouter.get("/", gamesController.renderGames);
gamesRouter.get("/newgame", gamesController.renderNewGameForm);
gamesRouter.post("/newgame", gamesController.addNewGame);
gamesRouter.get("/:gameId", gamesController.getGameById);
gamesRouter.post("/:gameId/delete", gamesController.deleteGameById);

module.exports = gamesRouter;
