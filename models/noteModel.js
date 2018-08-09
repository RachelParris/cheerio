const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const NoteSchema = new Schema({
  author: ObjectId,
  author_name: String,
  message: String,
  date: Date
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;