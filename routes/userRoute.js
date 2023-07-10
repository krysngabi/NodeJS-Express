const express = require("express");
const router = express.Router();
const { allUsers, userByUsernameAndPassword, updateUser, deleteUser, getUserByIdAndQuery } = require("../controllers/userController");

router.get("/", allUsers);

router
  .route("/user")
  .get(userByUsernameAndPassword)
  .put(updateUser)
  .delete(deleteUser);

//using multiple route for the same endpoint
router
  .route("/user/:id")
  .get(getUserByIdAndQuery);

// in case we need a method to be called before entering any of the 3 previous calls
// can be used to fetch for example that the user exists before doing anything
router.param("id", (req, res, next, id) => {
    console.log(`Operation for id ${id}`)
    next()
})

module.exports = router;
