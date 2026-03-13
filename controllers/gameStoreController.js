const db = require("../models/queries");

async function renderIndex(req, res) {
  res.render("index");
}

async function renderGames(req, res) {
  const games = await db.getAllGames();
  res.render("games", { games });
}

async function renderDevelopers(req, res) {
  const developers = await db.getAllDevelopers();
  res.render("developers", { developers });
}

async function renderGenres(req, res) {
  const genres = await db.getAllGenres();
  res.render("genres", { genres });
}

async function renderNewGameForm(req, res) {
  const genres = await db.getAllGenres();
  const developers = await db.getAllDevelopers();
  res.render("newGameForm", { genres, developers });
}

async function addNewGame(req, res) {
  const { title, genreId, developerId, release_date, rating } = req.body;
  await db.addNewGame(title, genreId, developerId, release_date, rating);
  res.redirect("/games");
}

async function getGameById(req, res) {
  const { gameId } = req.params;
  const game = await db.getGameById(gameId);
  res.render("game", { game });
}

async function deleteGameById(req, res) {
  const { gameId } = req.params;
  await db.deleteGameById(gameId);
  res.redirect("/games");
}

module.exports = {
  renderIndex,
  renderGames,
  renderDevelopers,
  renderGenres,
  renderNewGameForm,
  addNewGame,
  getGameById,
  deleteGameById,
};
