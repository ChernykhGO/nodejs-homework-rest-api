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

router.get("/:contactId", authenticate, controllerWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(ctrl.add)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  controllerWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", authenticate, controllerWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(ctrl.updateById)
);

module.exports = router;
