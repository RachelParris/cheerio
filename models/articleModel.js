const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const ArticleSchema = new Schema({
  author: String,
  title: String,
  body: String,
  article_url: String,
  author_url: String,
  date: Date,
  // `notes` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Note model
  // This allows us to populate the Article model with any associated Notes
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
