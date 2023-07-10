const express = require("express");
const replaceStr = (str, char, replacer) => {
  const regex = new RegExp(char, "g");
  const replaced = str.replace(regex, replacer);
  return replaced;
};

const convertArrayToJsonObject = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

const hasSQLError = (str) => {
  const errorQuery = ["sqlMessage", "errno", "sqlState", "sql"]
  return errorQuery.some(i => JSON.stringify(str).includes(i));
};

module.exports = {
  replaceStr,
  convertArrayToJsonObject,
  hasSQLError
};
