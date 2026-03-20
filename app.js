const express = require("express");
const app = express();
const path = require("node:path");
const PORT = process.env.PORT || 3000;

const mainRouter = require("./routes/mainRouter");
const gamesRouter = require("./routes/gamesRouter");
const developersRouter = require("./routes/developersRouter");
const genresRouter = require("./routes/genresRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", mainRouter);
app.use("/games", gamesRouter);
app.use("/developers", developersRouter);
app.use("/genres", genresRouter);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(
    `Mini Message Board app - listening on port http://localhost:${PORT}`,
  );
});
