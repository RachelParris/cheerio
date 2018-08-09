const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const db = require('../models');
const routes = express.Router();


// Scrape data from page
function getData (data) {
  const $ = cheerio.load(data);
  const articles = [];

  $('div.u-flexColumn').each(() => {

    const data = {}

    // Build data object
    data.title = $(this).find('h3.ui-h3').text();
    data.author = $(this).find('a.ds-link').text();
    data.authorUrl = $(this).find('a.ds-link').attr('href');
    data.url = $(this).find('a').attr('href');
    data.summary = $(this).find('a').children('h4.ui-summary').text();
    data.created = $(this).find('time').attr('datetime');

    // Add data object to articles array
    articles.push(data);
  });
  return articles;
}

// Scrape data and add to database
routes.get(`/articles/new/:topic?`, (req, res) => {
  // If no parameter entered by user, set to popular
  const topic = req.params.topic || 'popular';

  request(`https://medium.com/topic/${topic}`, (err, requestRes, body) => {
    if (err) {
      return console.log(err);
    }

    let data = getData(body);

    // Loop over data array and create a new document 
    data.forEach(item => {
      let article = new db.Article({
        author: item.author,
        title: item.title,
        body: item.summary,
        article_url: item.url,
        author_url: item.authorURL,
        date: item.created
      });

      // Add new article doc to the db
      article
        .save((err, docs) => {
          if (err) {
            return console.log(err);
          }

          console.log('saved!', docs);
        });
    });
  });
});

// Get all articles from db
routes.get(`/articles`, (req, res) => {
  db.Article.find({}, (err, docs) => {
    if (err) {
      return console.log(err);
    }

    res.json(docs);
  });
});

// Search for ONE article
routes.get(`/articles/:id`, (req, res) => {
  const id = req.params.id;

  db.Article.findOne({_id: id})
    // Adds any notes associated with the article
    .populate('notes')
    .then((article) => {
      res.json(article);
    });
});

// Add a note to ONE article
routes.post('/articles/:id', function (req, res) {
  const id = req.params.id;
  const body = req.body;

  db.Note.create(body)
    .then(function (note) {
      // The $push operator appends a specified value to an array.
      // model.findOneAndUpdate(where, data, { ...options, strict: true });
      db.Article.findOneAndUpdate({_id: id}, {$push: { notes: note._id}})
        .then(function (article) {
          res.json(article)
        });
    })
  
});

module.exports = routes;
