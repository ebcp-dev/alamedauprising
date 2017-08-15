//articles
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const reload = require('require-reload')(require)

const Article = require('../models/article')

//add articles
router.post('/new_article', (req, res) => {
    let title = req.body.title
    let author = req.body.author
    let body = req.body.text
    console.log(body)
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
        //else create new admin
        let newArticle = new Article({
            title: title,
            author: author,
            body: body
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
router.post('/edit_article', (req, res) => {
    let edit_title = req.body.title
    let author = req.body.author
    let edit_body = req.body.text
    let edit_id = req.body.articleid
    let dt = new Date()
    let edit_date = dt.toUTCString()
    console.log(`${edit_title} ${author} ${edit_date}`)
    Article.findByIdAndUpdate(edit_id,
        {
            $set: {
                title: edit_title,
                author: author,
                body: edit_body,
                date: edit_date
            }
        },
        (err, doc) => {
            console.log(doc)
            try {
                api = reload('./articles.js');
            } catch (e) {
                //if this threw an error, the api variable is still set to the old, working version
                console.error("Failed to reload articles.js! Error: ", e);
            }
        }
    )
    res.redirect('/ausite_admin/dashboard/#articles')
})

//delete article
router.post('/delete_article', (req, res) => {
    let article_id = req.body.articleid
    console.log(`${article_id}`)
    Article.findByIdAndRemove(article_id, (err, doc) => {
            console.log(doc)
        }
    )
    res.redirect('/ausite_admin/dashboard/#articles')
})

module.exports = router
