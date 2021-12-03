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

router.get("/:id", authenticate, controllerWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(ctrl.add)
);

router.patch(
  "/:id/favorite",
  authenticate,
  controllerWrapper(ctrl.updateFavorite)
);

router.delete("/:id", authenticate, controllerWrapper(ctrl.removeById));

router.put(
  "/:id",
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(ctrl.updateById)
);

module.exports = router;
