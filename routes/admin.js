//admin page
const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const expressValidator = require('express-validator')
const mongoose = require('mongoose')
const AsyncPolling = require('async-polling')

const Admin = require('../models/admin')
const Player = require('../models/player')
const Staff = require('../models/staff')

var roster
var staff
AsyncPolling(function (end) {
    // Do whatever you want. 
    Player.find({}, (err, docs) => {
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

//get signin page
router.get('/', function(req, res) {
    res.render('ausite_admin')
})

//get admin dashboard
router.get('/dashboard', ensureAuthenticated, function(req, res) {
    res.render('admin_dash', {rosterlist: roster, stafflist: staff})
})

//get register view
router.get('/register_admin', ensureAuthenticated, (req, res) => {
    res.render('register_admin')
})

//passed into function above as parameter
//prevents user from accessing dashboard if not logged in
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/ausite_admin')
    }
}

//post admin registration form
router.post('/register_admin', (req, res) => {
    let username = req.body.username
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let password2 = req.body.password2

    //validation
    req.checkBody('email', 'Email is required.').notEmpty()
    req.checkBody('email', 'Email is not valid.').isEmail()
    req.checkBody('username', 'Username is required.').notEmpty()
    req.checkBody('name', 'Name is required.').notEmpty()
    req.checkBody('password', 'Password is required.').notEmpty()
    req.checkBody('password2', 'Passwords do not match.').equals(req.body.password)

    //rerender page with errors
    let errors = req.validationErrors()
    if (errors) {
        console.log(errors)
        res.render('register_admin', {
            errors: errors
        })
    } else {
        //else create new admin
        let newAdmin = new Admin({
            username: username,
            name: name,
            contact_info: {
                email: email,
            },
            password: password
        })
        Admin.createAdmin(newAdmin, (err, admin) => {
            if (err) throw err
            console.log(admin)
        })
        req.flash('success_msg', 'Admin successfully registered.')
        res.redirect('/ausite_admin')
    }
})

//log in authentication
passport.use(new LocalStrategy(function(username, password, done) {
    //check account type
    Admin.getAdminbyUsername(username, function(err, user) {
        if (err) throw err
        if (!user) {
            return done(null, false, {message: 'Unknown User'})
        }
        Admin.comparePassword(password, user.password, function(err, isMatch) {
            if (err) throw err
            if (isMatch) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Invalid password'})
            }
        })
    })
}))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Admin.getAdminById(id, function(err, user) {
        done(err, user);
    });
});

//redirects user to dashboard if logged in succesfully, log in page is rerendered otherwise
router.post('/login', passport.authenticate('local', {successRedirect: '/ausite_admin/dashboard', failureRedirect: '/ausite_admin', failureFlash: true}), 
    function(req, res) {
        res.redirect('/ausite_admin')
    }
)

router.get('/logout', function(req, res) {
    req.logout()
    req.flash('success_msg', 'You are logged out.')
    res.redirect('/ausite_admin')
})

//update admin credentials
router.post('/update_profile', (req, res) => {
    let name = req.body.name
    let username = req.body.username
    let update_email = req.body.email

    console.log(`${name} ${username} ${update_email}`)

    Admin.findOneAndUpdate(username,
        {
            $set: {
                name: name,
                username: username,
                contact_info: {
                    email: update_email
                }
            }
        },
        (err, doc) => {
            console.log(doc)
        }
    )
    res.redirect('/ausite_admin/dashboard/#admincard')
})

module.exports = router
