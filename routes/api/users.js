const express = require("express");

const { auth, validation, upload, ctrlWrapper } = require("../../middleware");
const { joiVerifySchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.post(
  "/verify",
  validation(joiVerifySchema),
  ctrlWrapper(ctrl.reVerifyEmail)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
