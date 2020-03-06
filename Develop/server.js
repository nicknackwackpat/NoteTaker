const express = require("express");
const path = require("path");
const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("db/db.json");

const activeNote = [{

}];

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  app.post("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db.json"));

    let newNote = req.body;

    activeNote.push(newNote);

    res.json(newNote);

  });

  app.get("/api/notes", function(req, res) {
    let chosen = req.params.id;

    // db.title;
    // db.text;
  
    for (let i = 0; i < activeNote.length; i++) {
      if (chosen === activeNote[i].id) {
        app.delete("/api/notes/:id", function(req, res) {
          chosen.splice(activeNote);
          return res.json(true);
        });
      } else {
        res.json(false);
      }
    };
  
   // return res.json(activeNote);
  });
  //   // Add res.params.id after the app.delete()
  //   // javascript splice()
  //   // push note to array
  //   // fs.writeFile or appendFile to save the note array

    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "./public/index.html"));
    });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});