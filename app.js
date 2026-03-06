const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(
    `Mini Message Board app - listening on port http://localhost:${PORT}`,
  );
});
