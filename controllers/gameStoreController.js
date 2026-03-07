const db = require("../models/queries");

async function renderIndex(req, res) {
  res.render("index");
}

async function renderGames(req, res) {
  const games = await db.getAllGames();
  const game_developers = await db.getDeveloperForGame();
  console.log("Game developers", game_developers);
  const game_genres = await db.getGenreForGame();
  console.log("Game genres:", game_genres);
  res.render("games", { games, game_developers, game_genres });
}

async function renderDevelopers(req, res) {
  const developers = await db.getAllDevelopers();
  res.render("developers", { developers });
}

async function renderGenres(req, res) {
  const genres = await db.getAllGenres();
  res.render("genres", { genres });
}

module.exports = { renderIndex, renderGames, renderDevelopers, renderGenres };
