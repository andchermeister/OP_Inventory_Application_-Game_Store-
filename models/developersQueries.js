const pool = require("./pool");

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

async function addNewDeveloper(company_name, country, year_founded) {
  await pool.query(
    `
      INSERT INTO developers (company_name, country, year_founded)
      VALUES ($1, $2, $3)
    `,
    [company_name, country, year_founded],
  );
}

async function getDeveloperById(developerId) {
  const { rows } = await pool.query("SELECT * FROM developers WHERE id = $1", [
    developerId,
  ]);
  return rows[0];
}

async function deleteDeveloperById(developerId) {
  await pool.query("DELETE FROM developers WHERE id = $1", [developerId]);
}

async function updateDeveloper(
  developerId,
  company_name,
  country,
  year_founded,
) {
  await pool.query(
    `
      UPDATE developers
      SET company_name = $1, country = $2, year_founded = $3
      WHERE id = $4
    `,
    [company_name, country, year_founded, developerId],
  );
}

module.exports = {
  getAllDevelopers,
  addNewDeveloper,
  getDeveloperById,
  deleteDeveloperById,
  updateDeveloper,
};
