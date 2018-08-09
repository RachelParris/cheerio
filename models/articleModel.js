const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
 
const ArticleSchema = new Schema({
  author: String,
  title: String,
  body: String,
  article_url: String,
  author_url: String,
  date: Date,
  // `notes` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Book model
  // This allows us to populate the Library with any associated Books
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
