'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readNote = exports.removeNote = exports.saveNotes = exports.addNote = exports.loadNotes = exports.listNotes = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listNotes = exports.listNotes = function listNotes() {
  var notes = loadNotes();

  if (notes.length > 0) {
    console.log(_chalk2.default.green.inverse('Your notes:'));
    notes.forEach(function (note) {
      console.log(_chalk2.default.blue(note.title));
    });
  } else {
    console.log(_chalk2.default.red.inverse('Notes list is empty'));
  }
};

var loadNotes = exports.loadNotes = function loadNotes() {
  try {
    var notesBuffer = _fs2.default.readFileSync('notes.json');
    return JSON.parse(notesBuffer.toString());
  } catch (error) {
    console.log(_chalk2.default.red.inverse('Notes list is empty'));
    return [];
  }
};

var addNote = exports.addNote = function addNote(title, body) {
  var noteList = loadNotes();
  var filteredNotes = noteList.filter(function (note) {
    return title === note.title;
  });

  if (filteredNotes.length > 0) {
    console.log(_chalk2.default.red.inverse('Duplicate title'));
  } else {
    noteList.push({ title: title, body: body });
    console.log(_chalk2.default.green.inverse('Note added!'));
  }
  console.log(JsON.stringify(noteList));
  saveNotes(noteList);
};

var saveNotes = exports.saveNotes = function saveNotes(notesList) {
  var json = JSON.stringify(notesList);
  try {
    _fs2.default.writeFileSync('notes.json', json);
  } catch (e) {
    console.log(e);
  }
};

var removeNote = exports.removeNote = function removeNote(title) {
  var notesList = loadNotes();
  var notesListLength = notesList.length;
  notesList.forEach(function (note, i) {
    if (note.title === title) notesList.splice(i, 1);
  });
  saveNotes(notesList);
  console.log(notesList.length);
  console.log(notesListLength);
  if (notesList.length === notesListLength) {
    console.log(_chalk2.default.bgRed.bold('Title not found'));
  } else {
    console.log(_chalk2.default.blue.bgGreen.bold('Note removed!'));
  }
};

var readNote = exports.readNote = function readNote(title) {
  var notes = loadNotes();
  var foundNote = notes.find(function (note) {
    return note.title === title;
  });
  if (foundNote === undefined) {
    console.log(_chalk2.default.bgRed.blue('Note not found!'));
  } else {
    console.log(_chalk2.default.bgGreen.blue('Note found!'));
    console.log(_chalk2.default.bgGreen.red('Title: ' + foundNote.title));
    console.log(_chalk2.default.bgGreen.red('Body: ' + foundNote.body));
  }
};