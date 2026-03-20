const db = require("../models/gamesQueries");

async function renderGames(req, res) {
  const games = await db.getAllGames();
  res.render("gamesViews/games", { games });
}

async function renderNewGameForm(req, res) {
  const genres = await db.getAllGenres();
  const developers = await db.getAllDevelopers();
  res.render("gamesViews/newGameForm", { genres, developers });
}

async function addNewGame(req, res) {
  const { title, genreId, developerId, release_date, rating } = req.body;
  await db.addNewGame(title, genreId, developerId, release_date, rating);
  res.redirect("/games");
}

async function getGameById(req, res) {
  const { gameId } = req.params;
  const game = await db.getGameById(gameId);
  res.render("gamesViews/game", { game });
}

async function deleteGameById(req, res) {
  const { gameId } = req.params;
  await db.deleteGameById(gameId);
  res.redirect("/games");
}

module.exports = {
  renderGames,
  renderNewGameForm,
  addNewGame,
  getGameById,
  deleteGameById,
};
