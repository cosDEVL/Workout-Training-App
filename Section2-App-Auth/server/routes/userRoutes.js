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
} = require("../controllers/authControllers");
const { standardBouncer, fortKnoxBouncer } = require("../middleware/protect");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", fortKnoxBouncer, logout);

router.patch("/update-self", updateSelf);
router.delete("/delete-self", deleteSelf); // Soft-Delete

router.patch("/update-password", updatePassword);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);

module.exports = router;
