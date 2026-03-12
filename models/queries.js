const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query(`
                                    SELECT games.id, title, genre_name, company_name, release_date, rating
                                    FROM games
                                    JOIN games_genres ON games.id = games_genres.game_id
                                    JOIN genres ON games_genres.genre_id = genres.id
                                    JOIN games_developers ON games.id = games_developers.game_id
                                    JOIN developers ON games_developers.developer_id = developers.id;
                                      `);
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

async function addNewGame(title, genreId, developerId, release_date, rating) {
  const { rows } = await pool.query(
    "INSERT INTO games (title, release_date, rating) VALUES ($1, $2, $3) RETURNING id",
    [title, release_date, rating],
  );

  const gameId = rows[0].id;
  console.log("Inserted game with ID:", gameId);

  await pool.query(
    "INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)",
    [gameId, genreId],
  );

  await pool.query(
    "INSERT INTO games_developers (game_id, developer_id) VALUES ($1, $2)",
    [gameId, developerId],
  );
}

async function getGameById(gameId) {
  const { rows } = await pool.query(
    `
    SELECT * FROM games WHERE id = $1
    `,
    [gameId],
  );
  return rows[0];
}

module.exports = {
  getAllGames,
  getDeveloperForGame,
  getGenreForGame,
  getAllDevelopers,
  getAllGenres,
  addNewGame,
  getGameById,
};
