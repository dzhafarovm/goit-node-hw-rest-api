const express = require("express");

const { validation, ctrlWrapper } = require("../../middleware");
const { contactScheme } = require("../../schemes");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

const validateMiddleware = validation(contactScheme);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateById));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
