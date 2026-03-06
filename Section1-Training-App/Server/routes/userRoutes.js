const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  updateSelf,
  deleteSelf,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../controller/authControllers");
const { standardBouncer, fortKnoxBouncer } = require("../middleware/protect");
const { userData } = require("../controller/userController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", fortKnoxBouncer, logout);

router.get("/userData", fortKnoxBouncer, userData);

router.patch("/update-self", fortKnoxBouncer, updateSelf);
router.delete("/delete-self", fortKnoxBouncer, deleteSelf); // Soft-Delete

router.patch("/update-password", fortKnoxBouncer, updatePassword);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:resetToken", resetPassword);

module.exports = router;
