const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
 
const ArticleSchema = new Schema({
  author: String,
  title: String,
  body: String,
  article_url: String,
  author_url: String,
  date: Date
});

const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
