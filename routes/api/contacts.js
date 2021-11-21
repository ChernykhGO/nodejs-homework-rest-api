const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, controllerWrapper } = require("../../middlewares/");
const { joiContactSchema } = require("../../model/contact");

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(joiContactSchema), controllerWrapper(ctrl.add));

router.patch(
  "/:contactId/favorite",
  // validation(joiContactSchema),
  controllerWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", controllerWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(joiContactSchema),
  controllerWrapper(ctrl.updateById)
);

module.exports = router;
