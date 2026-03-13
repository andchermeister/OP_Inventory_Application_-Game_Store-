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

async function addNewDeveloper(req, res) {
  const { company_name, country, year_founded } = req.body;
  await db.addNewDeveloper(company_name, country, year_founded);
  res.redirect("/developers");
}

async function renderNewDeveloperForm(req, res) {
  res.render("newDeveloperForm");
}

async function getDeveloperById(req, res) {
  const { developerId } = req.params;
  const developer = await db.getDeveloperById(developerId);
  res.render("developer", { developer });
}

async function deleteDeveloperById(req, res) {
  const { developerId } = req.params;
  await db.deleteDeveloperById(developerId);
  res.redirect("/developers");
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
  addNewDeveloper,
  renderNewDeveloperForm,
  getDeveloperById,
  deleteDeveloperById,
};
