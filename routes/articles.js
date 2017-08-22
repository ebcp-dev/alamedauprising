//articles
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AsyncPolling = require('async-polling')
const helpers = require('handlebars-helpers')
const comparison = helpers.comparison()

const Article = require('../models/article')

var articles
AsyncPolling(function (end) {
    // Do whatever you want. 
    Article.find({}, 'title author body date link overview', (err, docs) => {
        if (err) throw err
        articles = docs
    })
    // Then notify the polling when your job is done:
    end();
    // This will schedule the next call. 
}, 3000).run();

//show articles list
router.get('/', function(req, res) {
    res.render('articles_view', {articlelist: articles})
})

//article page
router.get('/:link', function(req, res) {
    let the_link = req.params.link
    //convert link into title to search database
    the_link = the_link.split('-').join(' ')

    let article
    Article.findOne({title: the_link}, 'title author body date link overview', (err, doc) => {
        if (err) throw err
        article = doc
        console.log(article)
        res.render('article_page', {article})
    })
})

//add articles
router.post('/new_article', ensureAuthenticated, (req, res) => {
    let title = req.body.title
    let author = req.body.author
    let body = req.body.text
    let overview = req.body.overview
    //validation
    req.checkBody('title', 'Title is required.').notEmpty()
    req.checkBody('author', 'Author is required.').notEmpty()
    req.checkBody('text', 'Body text is required.').notEmpty()

    //rerender page with errors
    let errors = req.validationErrors()
    if (errors) {
        res.render('admin_dash', {
            errors: errors
        })
    } else {
        //else create new article
        let new_link = title.split(' ').join('-')
        let newArticle = new Article({
            title: title,
            author: author,
            body: body,
            link: new_link,
            overview: overview
        })
        Article.addArticle(newArticle, (err, article) => {
            if (err) throw err
            console.log(article)
        })
        req.flash('success_msg', 'Article successfully published.')
        res.redirect('/ausite_admin/dashboard/#articles')
    }
})

//edit article
router.post('/edit_article', ensureAuthenticated, (req, res) => {
    let edit_title = req.body.title
    let author = req.body.author
    let edit_body = req.body.text
    let edit_id = req.body.articleid
    let edit_overview = req.body.overview

    let dt = new Date()
    let edit_date = dt.toUTCString()

    let new_link = edit_title.split(' ').join('-')

    Article.findByIdAndUpdate(edit_id,
        {
            $set: {
                title: edit_title,
                author: author,
                body: edit_body,
                date: edit_date,
                link: new_link,
                overview: edit_overview
            }
        },
        (err, doc) => {
            console.log(doc)
        }
    )
    res.redirect('/ausite_admin/dashboard/#articles')
})

//delete article
router.post('/delete_article', ensureAuthenticated, (req, res) => {
    let article_id = req.body.articleid
    Article.findByIdAndRemove(article_id, (err, doc) => {
            console.log(doc)
        }
    )
    res.redirect('/ausite_admin/dashboard/#articles')
})

//passed into function above as parameter
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/ausite_admin')
    }
}

module.exports = router
