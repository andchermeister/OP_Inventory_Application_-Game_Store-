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

async function addNewGame(title, genreId, developerId, release_date, rating) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      "INSERT INTO games (title, release_date, rating) VALUES ($1, $2, $3) RETURNING id",
      [title, release_date, rating],
    );
    const gameId = rows[0].id;

    await client.query(
      "INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)",
      [gameId, genreId],
    );

    await client.query(
      "INSERT INTO games_developers (game_id, developer_id) VALUES ($1, $2)",
      [gameId, developerId],
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function getGameById(gameId) {
  const { rows } = await pool.query(
    `
    SELECT
      games.id,
      games.title, 
      genres.id AS genre_id,
      genres.genre_name,
      developers.id AS developer_id, 
      developers.company_name, 
      games.release_date, 
      games.rating
    FROM games
    JOIN games_genres ON games.id = games_genres.game_id
    JOIN genres ON games_genres.genre_id = genres.id
    JOIN games_developers ON games.id = games_developers.game_id
    JOIN developers ON games_developers.developer_id = developers.id
    WHERE games.id = $1;
    `,
    [gameId],
  );
  return rows[0];
}

async function deleteGameById(gameId) {
  await pool.query("DELETE FROM games WHERE id = $1", [gameId]);
}

async function updateGame(
  gameId,
  title,
  genreId,
  developerId,
  release_date,
  rating,
) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `
      UPDATE games
      SET title = $1, release_date = $2, rating = $3
      WHERE id = $4
    `,
      [title, release_date, rating, gameId],
    );

    await client.query(
      `
      UPDATE games_genres
      SET genre_id = $1
      WHERE game_id = $2
    `,
      [genreId, gameId],
    );

    await client.query(
      `
        UPDATE games_developers
        SET developer_id = $1
        WHERE game_id = $2
      `,
      [developerId, gameId],
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  getAllGames,
  getDeveloperForGame,
  getGenreForGame,
  addNewGame,
  getGameById,
  deleteGameById,
  updateGame,
};
