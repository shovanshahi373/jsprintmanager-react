require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const routes = require("./route");

// serve routes
app.use("/jspm", routes);

// serve static files
app.use(express.static(path.join(__dirname, "ui", "zebra-zpl", "build")));

// serve ui
app.get("*", (_req, res) =>
  res.sendFile(path.join(__dirname, "ui", "zebra-zpl", "build", "index.html"))
);

app.listen(PORT, () => console.log("server started on port %d", PORT));
