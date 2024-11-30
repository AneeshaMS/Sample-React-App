var express = require("express");
const {
  addUser,
  getUsers,
  getUserById,
  deleteUser,
  editUser,
} = require("../controller/user.controller");
var router = express.Router();

/* GET users listing. */
router.post("/add", addUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;
