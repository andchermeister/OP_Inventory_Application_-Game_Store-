const { body, validationResult } = require("express-validator");
const db = require("../models/developersQueries");

const validateDeveloper = [
  body("company_name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Company name must be between 1 and 100 characters"),

  body("country")
    .trim()
    .notEmpty()
    .withMessage("Country name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Country name must be between 4 and 100 characters"),

  body("year_founded")
    .trim()
    .notEmpty()
    .withMessage("Year founded is required")
    .isInt()
    .withMessage("Must be a number")
    .isLength({ min: 4, max: 4 })
    .withMessage("Year must be a 4 digits number"),
];

async function renderFormWithErrors(req, res, view, developerId = null) {
  const developer = developerId ? await db.getDeveloperById(developerId) : null;
  return res.status(400).render(view, {
    developer,
    errors: validationResult(req).array(),
    data: req.body,
  });
}

async function renderDevelopers(req, res) {
  const developers = await db.getAllDevelopers();
  res.render("developersViews/developers", { developers });
}

async function addNewDeveloper(req, res) {
  if (!validationResult(req).isEmpty())
    return renderFormWithErrors(req, res, "developersViews/newDeveloperForm");
  const { company_name, country, year_founded } = req.body;
  await db.addNewDeveloper(company_name, country, year_founded);
  res.redirect("/developers");
}

async function renderNewDeveloperForm(req, res) {
  res.render("developersViews/newDeveloperForm", { errors: [], data: {} });
}

async function getDeveloperById(req, res) {
  const { developerId } = req.params;
  const developer = await db.getDeveloperById(developerId);
  if (!developer)
    return res
      .status(404)
      .render("error", { message: "Developer not found", status: 404 });
  res.render("developersViews/developer", { developer });
}

async function deleteDeveloperById(req, res) {
  const { developerId } = req.params;
  const developer = await db.getDeveloperById(developerId);
  if (!developer)
    return res
      .status(404)
      .render("error", { message: "Developer not found", status: 404 });
  await db.deleteDeveloperById(developerId);
  res.redirect("/developers");
}

async function renderEditDeveloperForm(req, res) {
  const { developerId } = req.params;

  const developer = await db.getDeveloperById(developerId);
  if (!developer)
    return res
      .status(404)
      .render("error", { message: "Developer not found", status: 404 });
  res.render("developersViews/editDeveloperForm", {
    developer,
    errors: [],
    data: {},
  });
}

async function updateDeveloper(req, res) {
  const { developerId } = req.params;

  if (!validationResult(req).isEmpty())
    return renderFormWithErrors(
      req,
      res,
      "developersViews/editDeveloperForm",
      developerId,
    );

  const { company_name, country, year_founded } = req.body;
  await db.updateDeveloper(developerId, company_name, country, year_founded);
  res.redirect("/developers");
}

module.exports = {
  validateDeveloper,
  renderFormWithErrors,
  renderDevelopers,
  addNewDeveloper,
  renderNewDeveloperForm,
  getDeveloperById,
  deleteDeveloperById,
  renderEditDeveloperForm,
  updateDeveloper,
};
