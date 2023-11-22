const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
//const uuid = require('../helpers/uuid');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new NOTE
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const {title, text, id} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id,
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding Note');
  }
});

notes.delete('/:id', async (req,res) => {
  console.info(`${req.method} request received to delete a note`);
  console.log(req.body);

  if (req.body) {
    const {id} = req.body;
    console.log(id);
    let newNote = [];
    let data_scan = await readFromFile('./db/notes.json').then((data) => JSON.parse(data));
    console.log("Here we go",data_scan);
    data_scan.forEach((note) => {
      if (note.id != id) {
        console.log(note.id);
        newNote.push(note);
      }
    })
    console.log(newNote);
    //newNote = Object.assign({},newNote);
    //console.log(newNote);
    writeToFile('./db/notes.json',newNote); // This should overwrite the old file, aka delete the note
    res.json(`Note #${id} removed successfully`);
  } else {
    res.error('Error in removing Note');
  }
});

module.exports = notes;
