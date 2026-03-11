const db = require("../models/queries");

async function renderIndex(req, res) {
  res.render("index");
}

async function renderGames(req, res) {
  const games = await db.getAllGames();
  console.log(games);
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
  console.log(title, genreId, developerId, release_date, rating);
  await db.addNewGame(title, genreId, developerId, release_date, rating);
  res.redirect("/games");
}

module.exports = {
  renderIndex,
  renderGames,
  renderDevelopers,
  renderGenres,
  renderNewGameForm,
  addNewGame,
};
