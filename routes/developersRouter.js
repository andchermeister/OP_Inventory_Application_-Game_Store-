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
developersRouter.get(
  "/:developerId/edit",
  developersController.renderEditDeveloperForm,
);
developersRouter.post(
  "/:developerId/edit",
  developersController.updateDeveloper,
);

module.exports = developersRouter;
