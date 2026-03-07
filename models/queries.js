const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function getDeveloperForGame() {
  const { rows } = await pool.query(
    "SELECT developers.company_name FROM games JOIN games_developers ON games.id = games_developers.game_id JOIN developers ON games_developers.developer_id = developers.id",
  );
  return rows;
}

async function getGenreForGame() {
  const { rows } = await pool.query(
    "SELECT genres.genre_name FROM games JOIN games_genres ON games.id = games_genres.game_id JOIN genres ON games_genres.genre_id = genres.id",
  );
  return rows;
}

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

module.exports = {
  getAllGames,
  getDeveloperForGame,
  getGenreForGame,
  getAllDevelopers,
  getAllGenres,
};
