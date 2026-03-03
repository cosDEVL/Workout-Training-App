const express = require("express");
const { fortKnoxBouncer } = require("../middleware/protect");
const {
  addData,
  updateData,
  deleteData,
  allData,
  singleData,
} = require("../controllers/dataController");
const router = express.Router();

router.get("/", fortKnoxBouncer, allData);
router.get("/:dataID", fortKnoxBouncer, singleData);
router.post("/", fortKnoxBouncer, addData);
router.patch("/:dataID", fortKnoxBouncer, updateData);
router.delete("/:dataID", fortKnoxBouncer, deleteData);

module.exports = router;
