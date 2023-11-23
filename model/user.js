const mongoose = require('mongoose')
const schema = mongoose.Schema 

const userSchema = new schema({
    name: String,
    email: String,
    password: String,
})

const USER = mongoose.model('user', userSchema)

module.exports = USER;