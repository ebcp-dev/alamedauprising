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
        name: 'Elijah Twaggbe',
        jersey: 8
    },
    {
        name: 'Donovon Chen',
        jersey: 16
    },
]

let schedule = [
    {
        name: "Bay Area Sports Tournament",
        organizer: "Bay Area Sports",
        date: "July 29-30",
        time: "9 AM PDT",
        address: "1101 W. Red Line Avenue Alameda, CA 94501",
        location: "Alameda, CA",
        details: "Alameda Point Gym",
        link: "https://www.openball.com/seasonDivision/14715"
    }
]

let albums = [
    {
        name: "Coca Cola Nationals",
        location: "Los Angeles, CA",
        date: "June 24-25, 2017",
        cover: "coketourny/coketourny1",
        pics: [
            "coketourny/coketourny1",
            "coketourny/coketourny2",
            "coketourny/coketourny3",
            "coketourny/coketourny4",
            "coketourny/coketourny5",
            "coketourny/coketourny6",
            "coketourny/coketourny7",
            "coketourny/coketourny8",
            "coketourny/coketourny9",
            "coketourny/coketourny10",
            "coketourny/coketourny11",
        ]
    },
    {
        name: "Bay Area Sports Tournament",
        location: "Oakland, CA",
        date: "July 15, 2017",
        cover: "bastourny/bastourny1",
        pics: [
            "bastourny/bastourny1",
            "bastourny/bastourny2",
            "bastourny/bastourny3",
            "bastourny/bastourny4",
            "bastourny/bastourny5",
            "bastourny/bastourny6",
            "bastourny/bastourny7",
        ]
    },
]

let assistantcoaches = [
    "Rob Kiener",
    "Will Mustain",
    "Olosau Tasi",
    "Alvin Young",
]

let headcoach = "Ali Ravan"

let generalmanager = "Mehdi Ravan"

//get homepage
router.get('/', function(req, res) {
    res.render('index', {roster, albums, assistantcoaches, headcoach, generalmanager, schedule})
})

module.exports = router
