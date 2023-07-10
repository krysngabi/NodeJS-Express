const express = require("express");
const { dbQuery } = require("./connection");
const { convertArrayToJsonObject } = require("../helpers/utils");

const app = express();

app.use(express.json());

async function getUserById(id) {
  const userFound = await dbQuery({
    sql: "SELECT * FROM tb_user WHERE user_id = ?",
    timeout: 40000,
    values: [id],
  });
  return convertArrayToJsonObject(userFound);
}

async function getUserByUsernameAndPassWord(username, password) {
  const userFound = await dbQuery({
    sql: "SELECT * FROM tb_user WHERE username = ? AND password = ?",
    timeout: 40000,
    values: [username, password],
  });
  return convertArrayToJsonObject(userFound);
}

async function getAllUsers() {
  const userList = await dbQuery({
    sql: "SELECT * FROM tb_user ORDER BY username DESC",
    timeout: 40000,
  });
  return convertArrayToJsonObject(userList);
}

module.exports = {
  getUserById,
  getAllUsers,
  getUserByUsernameAndPassWord,
};
