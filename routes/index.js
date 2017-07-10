//homepage
const express = require('express')
const router = express.Router()

let roster = [
    {
        name: 'Quentel Reed',
        jersey: 00
    },
    {
        name: 'Cyrus Lavassani',
        jersey: 9
    },
    {
        name: 'Landis Green',
        jersey: 1
    },
    {
        name: 'Dylan Ravan',
        jersey: 0
    },
    {
        name: 'William Mustain',
        jersey: 5
    },
    {
        name: 'Nick Saikley',
        jersey: 6
    },
    {
        name: 'Desmond Ho',
        jersey: 2
    },
    {
        name: 'Kobe Kiener',
        jersey: 7
    },
    {
        name: 'Lamonte Mustain',
        jersey: 11
    },
    {
        name: 'Robert Holt',
        jersey: 3
    },
    {
        name: 'Darius Hayden',
        jersey: 22
    },
    {
        name: 'Rodrigo De Souza',
        jersey: 24
    },
    {
        name: 'Elijah',
        jersey: 8
    }
]

let pics = [
    "coketourny1",
    "coketourny2",
    "coketourny3",
    "coketourny4",
    "coketourny5",
    "coketourny6",
    "coketourny7",
]

//get homepage
router.get('/', function(req, res) {
    res.render('index', {roster, pics})
})

module.exports = router
