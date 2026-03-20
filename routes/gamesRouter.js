const { Router } = require("express");
const gamesRouter = Router();
const gamesController = require("../controllers/gamesController");

gamesRouter.get("/", gamesController.renderGames);
gamesRouter.get("/newgame", gamesController.renderNewGameForm);
gamesRouter.post("/newgame", gamesController.addNewGame);
gamesRouter.get("/:gameId", gamesController.getGameById);
gamesRouter.post("/:gameId/delete", gamesController.deleteGameById);
gamesRouter.get("/:gameId/edit", gamesController.renderEditGameForm);
gamesRouter.post("/:gameId/edit", gamesController.updateGame);

module.exports = gamesRouter;
