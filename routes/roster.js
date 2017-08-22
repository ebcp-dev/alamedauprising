//admin page
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Player = require('../models/player')
const Staff = require('../models/staff')

//add players to roster
router.post('/add_player', ensureAuthenticated, (req, res) => {
    let playername = req.body.playername
    let jersey = req.body.jersey

    //validation
    req.checkBody('playername', 'Name is required.').notEmpty()
    req.checkBody('jersey', 'Jersey number is required.').notEmpty()

    //rerender page with errors
    let errors = req.validationErrors()
    if (errors) {
        res.render('admin_dash', {
            errors: errors
        })
    } else {
        //else create new admin
        let newPlayer = new Player({
            name: playername,
            jersey: jersey
        })
        Player.addPlayer(newPlayer, (err, player) => {
            if (err) throw err
            console.log(player)
        })
        req.flash('success_msg', 'Player successfully added.')
        res.redirect('/ausite_admin/dashboard/#roster')
    }
})

//edit player
router.post('/edit_player', ensureAuthenticated, (req, res) => {
    let playername = req.body.playername
    let newjersey = req.body.jersey
    let player_id = req.body.objid
    console.log(`${playername} ${newjersey} ${player_id}`)
    Player.findByIdAndUpdate(player_id,
        {
            $set: {
                name: playername,
                jersey: newjersey
            }
        },
        (err, doc) => {
            console.log(doc)
        }
    )
    res.redirect('/ausite_admin/dashboard/#roster')
})

//delete player from roster
router.post('/delete_player', ensureAuthenticated, (req, res) => {
    let player_id = req.body.objid
    console.log(`${player_id}`)
    Player.findByIdAndRemove(player_id, (err, doc) => {
            console.log(doc)
        }
    )
    res.redirect('/ausite_admin/dashboard/#roster')
})

//add staff
router.post('/add_staff', ensureAuthenticated, (req, res) => {
    let staffname = req.body.staffname
    let position = req.body.position

    //validation
    req.checkBody('staffname', 'Name is required.').notEmpty()
    req.checkBody('position', 'Staff position is required.').notEmpty()

    //rerender page with errors
    let errors = req.validationErrors()
    if (errors) {
        res.render('admin_dash', {
            errors: errors
        })
    } else {
        //else create new admin
        let newStaff = new Staff({
            name: staffname,
            position: position
        })
        Staff.addStaff(newStaff, (err, staff) => {
            if (err) throw err
            console.log(staff)
        })
        req.flash('success_msg', 'Staff successfully added.')
        res.redirect('/ausite_admin/dashboard/#staff')
    }
}) 

//update staff
router.post('/edit_staff', ensureAuthenticated, (req, res) => {
    let staffname = req.body.staffname
    let udpateposition = req.body.position
    let staff_id = req.body.staffid
    console.log(`${staffname} ${udpateposition} ${staff_id}`)
    Staff.findByIdAndUpdate(staff_id,
        {
            $set: {
                name: staffname,
                position: udpateposition
            }
        },
        (err, doc) => {
            console.log(doc)
        }
    )
    res.redirect('/ausite_admin/dashboard/#staff')
})

//delete staff
router.post('/delete_staff', ensureAuthenticated, (req, res) => {
    let staff_id = req.body.staffid
    console.log(`${staff_id}`)
    Staff.findByIdAndRemove(staff_id, (err, doc) => {
            console.log(doc)
        }
    )
    res.redirect('/ausite_admin/dashboard/#staff')
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
