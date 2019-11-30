import * as Notes from './notes';
import { add } from  './utils';
// const validator = require('validator');
import chalk from 'Chalk';
const yargs = require('yargs');

// const monica = 'monica';
// console.log(monica);

// function printNotes (notes)  {
//   console.log(typeof getNotes);
// }
//
// console.log(chalk.blue.bgMagenta.bold.inverse('I love trees and clouds'));

// console.log(validator.isEmail('monica'));
// console.log(validator.isEmail('monica@gmail'));
// console.log(validator.isEmail('monica@gmail.com'));
// printNotes('Today is Sunday');

// let arg  = process.argv[2];
// console.log(process.argv);
// console.log(yargs.argv);

// switch (arg) {
//   case 'add':
//     console.log('adding note');
//     break;
//   case 'remove':
//     console.log('removing note');
//       break;
//   case 'update':
//     console.log('updating note');
//         break;
//   default:
//     console.log("oops! not an action");
// }

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      },
      body: {
        describe: 'Note body',
        demandOption: true,
        type: 'string'
      }
    },
    handler: (argv) => Notes.addNote(argv.title, argv.body)

});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
    handler: (argv) => Notes.removeNote(argv.title)

});

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: () => {
      Notes.listNotes();
    }
});

// Create read command
yargs.command({
  command: 'read',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    Notes.readNote(argv.title);
  }
});

console.log(yargs.argv); //  THIS LINE IS NECESSARY
