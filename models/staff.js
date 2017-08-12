const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const StaffSchema = mongoose.Schema({
    name: String,
    position: String
})

var Staff = module.exports = mongoose.model('Staff', StaffSchema)

module.exports.addStaff = (newStaff, callback) => {
    newStaff.save(callback)
}

//find by name in database
module.exports.getStaffByName = (name, callback) => {
    let query = {name: name}
    Staff.findOne(query, callback)
}

//find by object id
module.exports.getStaffById = (id, callback) => {
    Staff.findById(id, callback)
}