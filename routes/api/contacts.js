const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const { joiContactSchema } = require("../../model/contact");

router.get("/", authenticate, controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(ctrl.add)
);

router.patch("/:contactId/favorite", controllerWrapper(ctrl.updateFavorite));

router.delete("/:contactId", controllerWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(joiContactSchema),
  controllerWrapper(ctrl.updateById)
);

module.exports = router;
