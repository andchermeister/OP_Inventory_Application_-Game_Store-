const db = require("../models/developersQueries");

async function renderDevelopers(req, res) {
  const developers = await db.getAllDevelopers();
  res.render("developersViews/developers", { developers });
}

async function addNewDeveloper(req, res) {
  const { company_name, country, year_founded } = req.body;
  await db.addNewDeveloper(company_name, country, year_founded);
  res.redirect("/developers");
}

async function renderNewDeveloperForm(req, res) {
  res.render("developersViews/newDeveloperForm");
}

async function getDeveloperById(req, res) {
  const { developerId } = req.params;
  const developer = await db.getDeveloperById(developerId);
  res.render("developersViews/developer", { developer });
}

async function deleteDeveloperById(req, res) {
  const { developerId } = req.params;
  await db.deleteDeveloperById(developerId);
  res.redirect("/developers");
}

module.exports = {
  renderDevelopers,
  addNewDeveloper,
  renderNewDeveloperForm,
  getDeveloperById,
  deleteDeveloperById,
};
