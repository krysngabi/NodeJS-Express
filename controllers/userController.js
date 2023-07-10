const { json } = require("stream/consumers");
const {
  getAllUsers,
  getUserByUsernameAndPassWord,
  getUserById
} = require("../database/userDAO");

const { hasSQLError } = require('../helpers/utils')

const allUsers = async (req, res, next) => {
  try {
    const userList = await getAllUsers();
    if (hasSQLError(userList)) {
        console.log('error')
        res.status(500).json({ error : 'An exception occured' })
        // next()
    } else {
        res.json(await getAllUsers());
    }
  } catch (error) {
    next(error)
  }
};

const userByUsernameAndPassword = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    console.log('Async code execution.')
    throw new Error('Unexpected error on async!')
  } catch(error) {
    next(error)
  }
//   console.log(
//     `Getting user with username ${username} and passwordd = ${password}`
//   );
//   const userFound = await getUserByUsernameAndPassWord(
//     req.body.username,
//     req.body.password
//   );

//   if (userFound.length == 0) {
//     res.status(400).send({ message: "Sorry user not found" });
//   } else {
//     res.status(200).json(userFound);
//   }
};

const updateUser = (req, res) => {
  console.log(`Updating user with body username ${req.body.username}`);
};

const deleteUser = (req, res) => {
  console.log(`Deleting user with body username ${req.body.username}`);
};

const getUserByIdAndQuery = async (req, res) => {
  console.log(
    `Getting user with id ${req.params.id} with the name = ${req.query.name} and city = ${req.query.city}`
  );
  res.json(await getUserById(req.params.id));
};

module.exports = {
  allUsers,
  userByUsernameAndPassword,
  updateUser,
  deleteUser,
  getUserByIdAndQuery,
};
