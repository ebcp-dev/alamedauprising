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

let schedule = [
    {
        name: "Bay Area Sports Tournament - Junior Varsity",
        organizer: "Bay Area Sports",
        date: "July 15",
        time: "9 AM PDT",
        address: "12500 Campus Drive, Oakland, CA 94619",
        location: "Oakland, CA",
        details: "Merritt College, Jamtown",
        link: "http://www.openball.com/seasonDivision/14676"
    },
    {
        name: "Bay Area Sports Tournament - Varsity",
        organizer: "Bay Area Sports",
        date: "July 15",
        time: "4 PM PDT",
        address: "12500 Campus Drive, Oakland, CA 94619",
        location: "Oakland, CA",
        details: "Merritt College",
        link: "http://www.openball.com/seasonDivision/14678"
    },
    {
        name: "Jam On It Tournament",
        organizer: "Las Vegas Grand Finale",
        date: "July 21-23",
        address: "3150 Paradise Rd, Las Vegas, NV 89109",
        location: "Las Vegas, NV",
        details: "Las Vegas Convention Center - South Hall",
        link: "http://lasvegasgrandfinale.com/"
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

let assistantcoaches = [
    "Alvin Young",
    "Will Mustain",
    "Rob Kiener",
    "Olosau Tasi"
]

let headcoach = "Ali Ravan"

let generalmanager = "Mehdi Ravan"

//get homepage
router.get('/', function(req, res) {
    res.render('index', {roster, pics, assistantcoaches, headcoach, generalmanager, schedule})
})

module.exports = router
