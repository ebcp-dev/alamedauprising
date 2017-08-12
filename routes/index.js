//homepage
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AsyncPolling = require('async-polling')
const helpers = require('handlebars-helpers')
const comparison = helpers.comparison()

const Player = require('../models/player')
const Staff = require('../models/staff')

var roster
var staff
AsyncPolling(function (end) {
    // Do whatever you want. 
    Player.find({}, 'name jersey', (err, docs) => {
        if (err) throw err
        roster = docs
    })
    Staff.find({}, (err, docs) => {
        if (err) throw err
        staff = docs
    })
    // Then notify the polling when your job is done:
    end();
    // This will schedule the next call. 
}, 3000).run();

var schedule = [
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

var assistantcoaches = [
    "Rob Kiener",
    "Will Mustain",
    "Olosau Tasi",
    "Alvin Young",
]

var headcoach = "Ali Ravan Jr"

var generalmanager = "Mehdi Ravan"

//get homepage
router.get('/', function(req, res) {
    res.render('index', {rosterlist: roster, stafflist: staff, assistantcoaches, headcoach, generalmanager, schedule, comparison})
})

module.exports = router
