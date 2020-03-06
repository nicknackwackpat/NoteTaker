const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  uuid
} = require("uuidv4");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
const OUTPUT_DIR = path.resolve(__dirname, "db")
const outputPath = path.join(OUTPUT_DIR, "db.json");

const db = require("./db/db.json");

// const activeNote = [{}];

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

getDatabase(() => {
app.get("/api/notes", function (req, res) {
  res.json(db);
  });
});

postNewNote(() => {
  app.post("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db.json"));

    let newNote = req.body;

    newNote.id = uuid(id);

    db.push(newNote);

    fs.writeFile(outputPath, db, function (err) {
      if (err) throw err;
    });

  });
});

deleteNote(() => {
  app.delete("/api/notes/:id", function (req, res) {
    let chosenId = res.params.id;
    // newNote.id = uuid(newNote);

    for (let i = 0; i < db.length; i++) {
      if (chosenId === db[i].id) {
        db.splice(i, 1);

      } else {
        res.json(db);
      }
    };
  });
});


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});