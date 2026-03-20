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

module.exports = {
  getAllDevelopers,
  addNewDeveloper,
  getDeveloperById,
  deleteDeveloperById,
};
