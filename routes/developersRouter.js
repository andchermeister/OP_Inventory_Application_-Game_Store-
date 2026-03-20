const { Router } = require("express");
const developersRouter = Router();
const developersController = require("../controllers/developersController");

developersRouter.get("/", developersController.renderDevelopers);
developersRouter.get(
  "/newdeveloper",
  developersController.renderNewDeveloperForm,
);
developersRouter.post("/newdeveloper", developersController.addNewDeveloper);
developersRouter.get("/:developerId", developersController.getDeveloperById);
developersRouter.post(
  "/:developerId/delete",
  developersController.deleteDeveloperById,
);

module.exports = developersRouter;
