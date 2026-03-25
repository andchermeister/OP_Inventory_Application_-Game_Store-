const { Router } = require("express");
const genresRouter = Router();
const genresController = require("../controllers/genresController");

genresRouter.get("/", genresController.renderGenres);
genresRouter.get("/newgenre", genresController.renderNewGenreForm);
genresRouter.post(
  "/newgenre",
  genresController.validateGenre,
  genresController.addNewGenre,
);
genresRouter.get("/:genreId", genresController.getGenreById);
genresRouter.post("/:genreId/delete", genresController.deleteGenreById);
genresRouter.get("/:genreId/edit", genresController.renderEditGenreForm);
genresRouter.post(
  "/:genreId/edit",
  genresController.validateGenre,
  genresController.updateGenre,
);

module.exports = genresRouter;
