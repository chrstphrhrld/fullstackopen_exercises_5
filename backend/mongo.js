const mongoose = require('mongoose')
require('dotenv').config()

// if (process.argv.length < 3) {
// 	console.log('give password as argument')
// 	process.exit(1)
// }

// const password =

const url = process.env.TEST_MONGODB_URI_NOTES

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
	content: 'Beer makes things so much more easy',
	date: new Date(),
	important: true,
})

// /*
note.save().then(() => {
	console.log('note saved!')
	mongoose.connection.close()
})


// Note.find({}).then(result => {
// 	result.forEach(note => {
// 		console.log(note)
// 	})
// 	mongoose.connection.close()
// })