const pool = require("./pool");

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

async function addNewGenre(genre_name) {
  await pool.query("INSERT INTO genres (genre_name) VALUES ($1)", [genre_name]);
}

async function getGenreById(genreId) {
  const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1", [
    genreId,
  ]);
  return rows[0];
}

async function deleteGenreById(genreId) {
  await pool.query("DELETE FROM genres WHERE id = $1", [genreId]);
}

async function updateGenre(genreId, genre_name) {
  await pool.query(
    `
      UPDATE genres
      SET genre_name = $1
      WHERE id = $2
    `,
    [genre_name, genreId],
  );
}

module.exports = {
  getAllGenres,
  addNewGenre,
  getGenreById,
  deleteGenreById,
  updateGenre,
};
