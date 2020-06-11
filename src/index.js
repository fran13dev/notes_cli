const yargs = require('yargs')
const notes = require('./notes.js')

yargs.command({
	command: 'add',
	description: 'Add a note',
	builder: {
		title: {
			description: 'Note title',
			demandOption: true,
			type: 'string',
		},
		body: {
			description: 'Note info',
			demandOption: true,
			type: 'string',
		},
	},
	handler(args) {
		notes.addNote(args.title, args.body)
	},
})

yargs.command({
	command: 'remove',
	description: 'Remove a note',
	builder: {
		title: {
			description: 'Title of note to delete',
			demandOption: true,
			type: 'string',
		},
	},
	handler(args) {
		notes.removeNote(args.title)
	},
})

yargs.command({
	command: 'read',
	description: 'Read a note',
	builder: {
		title: {
			description: 'Title of note to display',
			demandOption: true,
			type: 'string',
		},
	},
	handler(args) {
		notes.readNote(args.title)
	},
})

yargs.command({
	command: 'list',
	description: 'List all notes',
	handler() {
		notes.listNotes()
	},
})

yargs.parse()
