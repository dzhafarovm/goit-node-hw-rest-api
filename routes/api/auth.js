const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middleware");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.signup));

router.post("/signin", validation(joiLoginSchema), ctrlWrapper(ctrl.signin));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
