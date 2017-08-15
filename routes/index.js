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
        name: "Tournament of Champions",
        organizer: "Bay Area Sports",
        date: "August 26-27",
        time: "",
        address: "31 4th Street Oakland, CA 94607",
        location: "Oakland, CA",
        details: "Jamtown, City College of San Francisco",
        link: "http://bayareasports.org/"
    }
]

//get homepage
router.get('/', function(req, res) {
    res.render('index', {rosterlist: roster, stafflist: staff, schedule})
})

module.exports = router
