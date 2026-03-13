const { Router } = require("express");
const gameStoreRouter = Router();
const gameStoreController = require("../controllers/gameStoreController");

gameStoreRouter.get("/", gameStoreController.renderIndex);

gameStoreRouter.get("/games", gameStoreController.renderGames);
gameStoreRouter.get("/newgame", gameStoreController.renderNewGameForm);
gameStoreRouter.post("/newgame", gameStoreController.addNewGame);
gameStoreRouter.get("/games/:gameId", gameStoreController.getGameById);
gameStoreRouter.post(
  "/games/:gameId/delete",
  gameStoreController.deleteGameById,
);

gameStoreRouter.get("/developers", gameStoreController.renderDevelopers);
gameStoreRouter.get(
  "/newdeveloper",
  gameStoreController.renderNewDeveloperForm,
);
gameStoreRouter.post("/newdeveloper", gameStoreController.addNewDeveloper);
gameStoreRouter.get(
  "/developers/:developerId",
  gameStoreController.getDeveloperById,
);
gameStoreRouter.post(
  "/developers/:developerId/delete",
  gameStoreController.deleteDeveloperById,
);

gameStoreRouter.get("/genres", gameStoreController.renderGenres);

module.exports = gameStoreRouter;
