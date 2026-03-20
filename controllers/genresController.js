const db = require("../models/genresQueries");

async function renderGenres(req, res) {
  const genres = await db.getAllGenres();
  res.render("genresViews/genres", { genres });
}

async function renderNewGenreForm(req, res) {
  res.render("genresViews/newGenreForm");
}

async function addNewGenre(req, res) {
  const { genre_name } = req.body;
  await db.addNewGenre(genre_name);
  res.redirect("/genres");
}

async function getGenreById(req, res) {
  const { genreId } = req.params;
  const genre = await db.getGenreById(genreId);
  res.render("genresViews/genre", { genre });
}

async function deleteGenreById(req, res) {
  const { genreId } = req.params;
  await db.deleteGenreById(genreId);
  res.redirect("/genres");
}

module.exports = {
  renderGenres,
  renderNewGenreForm,
  addNewGenre,
  getGenreById,
  deleteGenreById,
};
