const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
// const mongoose = require('mongoose');
const Article = require('../models/articleModel');
const routes = express.Router();

function getData (data) {
  const $ = cheerio.load(data);
  const articles = [];

  $('div.u-flexColumn').each(function (index, element) {

    let result = {}

    result.title = $(this).find('h3.ui-h3').text();
    result.author = $(this).find('a.ds-link').text();
    result.authorUrl = $(this).find('a.ds-link').attr('href');
    result.url = $(this).find('a').attr('href');
    result.summary = $(this).find('a').children('h4.ui-summary').text();
    result.created = $(this).find('time').attr('datetime');
    articles.push(result);
  });
  return articles;
}

routes.get('/addarticles/:topic?', function (req, res) {
  const topic = req.params.topic || 'popular';

  request('https://medium.com/topic/' + topic, function (err, response, body) {
    if (err) {
      return console.log(err);
    }

    let data = getData(body);
    res.json(data);

    data.forEach(item => {
      let article = new Article({
        author: item.author,
        title: item.title,
        body: item.summary,
        article_url: item.url,
        author_url: item.authorURL,
        date: item.created
      });

      article
        .save((err, docs) => console.log('saved!', docs));
    });
  });
});


routes.get('/articles', function (req, res) {
  // Get all articles from db
  Article.find({}, function (err, docs) {
    res.json(docs);
  });
});
module.exports = routes;
