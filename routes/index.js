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
        date: "July 30",
        time: "10 AM PDT",
        address: "1101 W. Red Line Avenue Alameda, CA 94501",
        location: "Alameda, CA",
        details: "Alameda Point Gym",
        link: "https://www.openball.com/seasonDivision/14715"
    }
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
    res.render('index', {roster, assistantcoaches, headcoach, generalmanager, schedule})
})

module.exports = router
