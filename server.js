const express = require("express");
const path = require("path");
const fs = require("fs");
const { uuid } = require("uuidv4");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const OUTPUT_DIR = path.resolve(__dirname, "db")
const outputPath = path.join(OUTPUT_DIR, "db.json");
let db = require("./db/db.json");

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.post("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));

  let newNote = req.body;

  newNote.id = uuid();

  db.push(newNote);

  fs.writeFile(outputPath, JSON.stringify(db), function (err) {
    if (err) throw err;
  });

});


app.delete("/api/notes/:id", function (req, res) {
  let chosenId = req.params.id;

  for (let i = 0; i < db.length; i++) {
    if (chosenId === db[i].id) {
      db.splice(i, 1);
    }
  };
  res.json(db);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});