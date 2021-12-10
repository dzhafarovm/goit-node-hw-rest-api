const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middleware");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

const validateMiddleware = validation(joiSchema);

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
