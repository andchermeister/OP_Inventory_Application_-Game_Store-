const db = require("../models/queries");

async function getAllGames(req, res) {
  const games = await db.getAllGames();
  console.log("Games: ", games);
  res.render("index");
}

module.exports = { getAllGames };
