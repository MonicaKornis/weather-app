import fs from 'fs';
import chalk from 'chalk';

export const listNotes = () => {
    let notes = loadNotes();

    if(notes.length > 0) {
      console.log(chalk.green.inverse('Your notes:'));
      notes.forEach((note) => {
        console.log(chalk.blue(note.title));
      });
    } else {
      console.log(chalk.red.inverse('Notes list is empty'));
    }
};

export const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync('notes.json');
    return JSON.parse(notesBuffer.toString());
  } catch(error)  {
    console.log(chalk.red.inverse('Notes list is empty'));
    return [];
  }
};

export const addNote = (title,body) => {
  const noteList = loadNotes();
  let filteredNotes = noteList.filter((note) => title === note.title);

  if(filteredNotes.length > 0) {
    console.log(chalk.red.inverse('Duplicate title'));
  } else {
    noteList.push({ title: title, body: body});
    console.log(chalk.green.inverse('Note added!'));
  }
  console.log(JsON.stringify(noteList));
  saveNotes(noteList);
};

export const saveNotes = (notesList) => {
  let json = JSON.stringify(notesList);
  try {
    fs.writeFileSync('notes.json', json);
  } catch(e) {
    console.log(e);
  }
};

export const removeNote = (title) => {
  let notesList = loadNotes();
  let notesListLength = notesList.length;
  notesList.forEach((note,i) => {
    if(note.title === title) notesList.splice(i,1);
  });
  saveNotes(notesList);
  console.log(notesList.length);
  console.log(notesListLength);
  if(notesList.length === notesListLength) {
    console.log(chalk.bgRed.bold('Title not found'));
  } else {
    console.log(chalk.blue.bgGreen.bold('Note removed!'));
  }
};

export const readNote = (title) => {
  let notes = loadNotes();
  let foundNote = notes.find((note) => note.title === title);
  if(foundNote === undefined) {
    console.log(chalk.bgRed.blue('Note not found!'));
  } else {
    console.log(chalk.bgGreen.blue('Note found!'));
    console.log(chalk.bgGreen.red(`Title: ${foundNote.title}`));
    console.log(chalk.bgGreen.red(`Body: ${foundNote.body}`));
  }
};
