const games_db = require("../models/gamesQueries");
const developers_db = require("../models/developersQueries");
const genres_db = require("../models/genresQueries");

async function renderGames(req, res, next) {
  try {
    const games = await games_db.getAllGames();
    res.render("gamesViews/games", { games });
  } catch (error) {
    next(error);
  }
}

async function renderNewGameForm(req, res) {
  const genres = await genres_db.getAllGenres();
  const developers = await developers_db.getAllDevelopers();
  res.render("gamesViews/newGameForm", { genres, developers });
}

async function addNewGame(req, res, next) {
  try {
    const { title, genreId, developerId, release_date, rating } = req.body;
    await games_db.addNewGame(
      title,
      genreId,
      developerId,
      release_date,
      rating,
    );
    res.redirect("/games");
  } catch (error) {
    next(error);
  }
}

async function getGameById(req, res) {
  const { gameId } = req.params;
  const game = await games_db.getGameById(gameId);
  res.render("gamesViews/game", { game });
}

async function deleteGameById(req, res) {
  const { gameId } = req.params;
  await games_db.deleteGameById(gameId);
  res.redirect("/games");
}

async function renderEditGameForm(req, res) {
  const { gameId } = req.params;

  const game = await games_db.getGameById(gameId);
  const genres = await genres_db.getAllGenres();
  const developers = await developers_db.getAllDevelopers();

  res.render("gamesViews/editGameForm", { game, genres, developers });
}

async function updateGame(req, res) {
  const { gameId } = req.params;
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
  renderGames,
  renderNewGameForm,
  addNewGame,
  getGameById,
  deleteGameById,
  renderEditGameForm,
  updateGame,
};
