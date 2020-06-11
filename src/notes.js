const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
	let notes = loadNotes()

	const isDuplicate = notes.find(note => note.title === title)

	if (!isDuplicate) {
		const newNote = {
			title: title,
			body: body,
		}
		notes = [...notes, newNote]
		saveNote(notes)
		console.log(chalk.green('Note successfully added'))
	} else {
		console.log(chalk.red(`${title} is already being used as a title.`))
	}
}

const removeNote = title => {
	const notes = loadNotes()

	const remaining = notes.filter(note => note.title !== title)

	if (remaining.length !== notes.length) {
		saveNote(remaining)
		console.log(chalk.green('Note successfully removed'))
	} else {
		console.log(chalk.red(`${title} does not exist.`))
	}
}

const saveNote = notes => {
	const data = JSON.stringify(notes)
	fs.writeFileSync('notes.json', data)
}

const readNote = title => {
	const notes = loadNotes()

	const noteToRead = notes.find(note => note.title === title)

	if (noteToRead) {
		console.log(chalk.green.bold('Title: ') + noteToRead.title)
		console.log(chalk.green.bold('Body: ') + noteToRead.body)
	} else {
		console.log(chalk.red(`${title} not found`))
	}
}

const listNotes = () => {
	const notes = loadNotes()
	if (notes.length > 0) {
		console.log(chalk.green.bold('Your notes:'))
		notes.map(note => console.log(note.title))
	} else {
		console.log(chalk.red('No notes found'))
	}
}

const loadNotes = () => {
	try {
		const buffer = fs.readFileSync('notes.json')
		const data = buffer.toString()
		return JSON.parse(data)
	} catch (e) {
		return []
	}
}

module.exports = {
	listNotes: listNotes,
	addNote: addNote,
	removeNote: removeNote,
	readNote: readNote,
}
