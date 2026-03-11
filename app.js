const express = require("express");
const app = express();
const path = require("node:path");
const PORT = process.env.PORT || 3000;

const gameStoreRouter = require("./routes/gameStoreRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", gameStoreRouter);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(
    `Mini Message Board app - listening on port http://localhost:${PORT}`,
  );
});
