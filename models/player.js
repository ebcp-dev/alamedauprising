const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const PlayerSchema = mongoose.Schema({
    name: String,
    jersey: Number
})

var Roster = module.exports = mongoose.model('Player', PlayerSchema)

module.exports.addPlayer = (newPlayer, callback) => {
    newPlayer.save(callback)
}

//find by name in database
module.exports.getPlayerbyName = (name, callback) => {
    let query = {name: name}
    Roster.findOne(query, callback)
}

//find by object id
module.exports.getPlayerById = (id, callback) => {
    Roster.findById(id, callback)
}