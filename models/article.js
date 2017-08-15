const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const ArticleSchema = mongoose.Schema({
    title: String,
    author: String,
    body: String,
    date: {
        type: Date,
        default: Date.now
    }
})

var Article = module.exports = mongoose.model('Article', ArticleSchema)

module.exports.addArticle = (newArticle, callback) => {
    newArticle.save(callback)
}

//find by name in database
module.exports.getArticleByTitle = (title, callback) => {
    let query = {title: title}
    Article.findOne(query, callback)
}

//find by object id
module.exports.getArticleById = (id, callback) => {
    Article.findById(id, callback)
}