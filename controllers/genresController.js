const { body, validationResult } = require("express-validator");
const db = require("../models/genresQueries");

const validateGenre = [
  body("genre_name")
    .trim()
    .notEmpty()
    .withMessage("Genre name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Genre name must be between 3 and 100 characters"),
];

async function renderFormWithErrors(req, res, view, genreId = null) {
  const genre = genreId ? await db.getGenreById(genreId) : null;
  return res.status(400).render(view, {
    genre,
    errors: validationResult(req).array(),
    data: req.body,
  });
}

async function renderGenres(req, res) {
  const genres = await db.getAllGenres();
  res.render("genresViews/genres", { genres });
}

async function renderNewGenreForm(req, res) {
  res.render("genresViews/newGenreForm", { errors: [], data: {} });
}

async function addNewGenre(req, res) {
  if (!validationResult(req).isEmpty())
    return renderFormWithErrors(req, res, "genresViews/newGenreForm");
  const { genre_name } = req.body;
  await db.addNewGenre(genre_name);
  res.redirect("/genres");
}

async function getGenreById(req, res) {
  const { genreId } = req.params;
  const genre = await db.getGenreById(genreId);
  if (!genre)
    return res
      .status(404)
      .render("error", { message: "Genre not found", status: 404 });
  res.render("genresViews/genre", { genre });
}

async function deleteGenreById(req, res) {
  const { genreId } = req.params;
  const { password } = req.body;
  if (password !== process.env.DELETE_PASSWORD)
    return res
      .status(403)
      .render("error", { message: "Incorrect password", status: 403 });
  const genre = await db.getGenreById(genreId);
  if (!genre)
    return res
      .status(404)
      .render("error", { message: "Genre not found", status: 404 });
  await db.deleteGenreById(genreId);
  res.redirect("/genres");
}

async function renderEditGenreForm(req, res) {
  const { genreId } = req.params;

  const genre = await db.getGenreById(genreId);
  if (!genre)
    return res
      .status(404)
      .render("error", { message: "Genre not found", status: 404 });
  res.render("genresViews/editGenreForm", { genre, errors: [], data: {} });
}

async function updateGenre(req, res) {
  const { genreId } = req.params;
  if (!validationResult(req).isEmpty())
    return renderFormWithErrors(req, res, "genresViews/editGenreForm", genreId);

  const { genre_name } = req.body;

  await db.updateGenre(genreId, genre_name);
  res.redirect("/genres");
}

module.exports = {
  validateGenre,
  renderFormWithErrors,
  renderGenres,
  renderNewGenreForm,
  addNewGenre,
  getGenreById,
  deleteGenreById,
  renderEditGenreForm,
  updateGenre,
};
