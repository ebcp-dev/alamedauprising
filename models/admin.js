const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: String,
    contact_info: {
        email: {
            type: String
        }
    },
    name: String
})

var Admin = module.exports = mongoose.model('Admin', AdminSchema)

module.exports.createAdmin = (newAdmin, callback) => {
    //hashes password in database
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newAdmin.password, salt, function(err, hash) {
            newAdmin.password = hash
            newAdmin.save(callback)
        });
    });
}

//find by username in database
module.exports.getAdminbyUsername = (username, callback) => {
    let query = {username: username}
    Admin.findOne(query, callback)
}

//find by user id
module.exports.getAdminById = (id, callback) => {
    Admin.findById(id, callback)
}

//compares password in database for validation
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err
        callback(null, isMatch)
    });
}