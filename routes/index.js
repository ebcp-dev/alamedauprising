//homepage
const express = require('express')
const router = express.Router()

let roster = [
    {
        position: 'Guard',
        name: 'player1',
        height: '5\'9',
        age: 16
    },
    {
        position: 'Guard',
        name: 'player2',
        height: '5\'11',
        age: 15
    },
    {
        position: 'Forward',
        name: 'player3',
        height: '6\'3',
        age: 17
    },
    {
        position: 'Center',
        name: 'player4',
        height: '6\'7',
        age: 17
    }
]

//get homepage
router.get('/', function(req, res) {
    res.render('index', {roster})
})

module.exports = router
