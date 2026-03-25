const { body, validationResult } = require("express-validator");
const games_db = require("../models/gamesQueries");
const developers_db = require("../models/developersQueries");
const genres_db = require("../models/genresQueries");

const validateGame = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Title must be between 3 and 30 characters"),

  body("genreId")
    .notEmpty()
    .withMessage("Genre is required")
    .isInt({ gt: 0 })
    .withMessage("Genre must be a valid ID")
    .toInt(),

  body("developerId")
    .notEmpty()
    .withMessage("Developer is required")
    .isInt({ gt: 0 })
    .withMessage("Developer must be a valid ID")
    .toInt(),

  body("release_date")
    .notEmpty()
    .withMessage("Release date is required")
    .isISO8601()
    .withMessage("Release date must be a valid date"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({ min: 1, max: 100 })
    .withMessage("Rating must be between 1 and 100")
    .toFloat(),
];

async function renderFormWithErrors(req, res, view, gameId = null) {
  const [genres, developers] = await Promise.all([
    genres_db.getAllGenres(),
    developers_db.getAllDevelopers(),
  ]);

  const game = gameId ? await games_db.getGameById(gameId) : null;
  return res.status(400).render(view, {
    game,
    genres,
    developers,
    errors: validationResult(req).array(),
    data: req.body,
  });
}

async function renderGames(req, res) {
  const games = await games_db.getAllGames();
  res.render("gamesViews/games", { games });
}

async function renderNewGameForm(req, res) {
  const genres = await genres_db.getAllGenres();
  const developers = await developers_db.getAllDevelopers();
  res.render("gamesViews/newGameForm", {
    genres,
    developers,
    errors: [],
    data: {},
  });
}

async function addNewGame(req, res) {
  if (!validationResult(req).isEmpty())
    return renderFormWithErrors(req, res, "gamesViews/newGameForm");
  const { title, genreId, developerId, release_date, rating } = req.body;
  await games_db.addNewGame(title, genreId, developerId, release_date, rating);
  res.redirect("/games");
}

async function getGameById(req, res) {
  const { gameId } = req.params;
  const game = await games_db.getGameById(gameId);
  if (!game)
    return res
      .status(404)
      .render("error", { message: "Game not found", status: 404 });
  res.render("gamesViews/game", { game });
}

async function deleteGameById(req, res) {
  const { gameId } = req.params;
  const game = await games_db.getGameById(gameId);
  if (!game)
    return res
      .status(404)
      .render("error", { message: "Game not found", status: 404 });
  await games_db.deleteGameById(gameId);
  res.redirect("/games");
}

async function renderEditGameForm(req, res) {
  const { gameId } = req.params;

  const [game, genres, developers] = await Promise.all([
    games_db.getGameById(gameId),
    genres_db.getAllGenres(),
    developers_db.getAllDevelopers(),
  ]);
  if (!game)
    return res
      .status(404)
      .render("error", { message: "Game not found", status: 404 });
  res.render("gamesViews/editGameForm", {
    game,
    genres,
    developers,
    errors: [],
    data: {},
  });
}

async function updateGame(req, res) {
  const { gameId } = req.params;
  if (!validationResult(req).isEmpty())
    return renderFormWithErrors(req, res, "gamesViews/editGameForm", gameId);

  const { title, genreId, developerId, release_date, rating } = req.body;

  await games_db.updateGame(
    gameId,
    title,
    genreId,
    developerId,
    release_date,
    rating,
  );

  res.redirect("/games");
}

module.exports = {
  validateGame,
  renderGames,
  renderNewGameForm,
  addNewGame,
  getGameById,
  deleteGameById,
  renderEditGameForm,
  updateGame,
};
