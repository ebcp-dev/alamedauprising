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
        name: "Jam On It Tournament",
        organizer: "Las Vegas Grand Finale",
        date: "July 21-23",
        time: "11:40 AM",
        address: "3150 Paradise Rd, Las Vegas, NV 89109",
        location: "Las Vegas, NV",
        details: "Las Vegas Convention Center - South Hall",
        link: "http://lasvegasgrandfinale.com/"
    }
]

let albums = [
    {
        name: "Coca Cola Nationals",
        location: "Los Angeles, CA",
        date: "June 24-25",
        pics: [
            "coketourny1",
            "coketourny2",
            "coketourny3",
            "coketourny4",
            "coketourny5",
            "coketourny6",
            "coketourny7",
            "coketourny8",
            "coketourny9",
            "coketourny10",
            "coketourny11",
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
