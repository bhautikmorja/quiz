const mongoose = require('mongoose')
const schmea = mongoose.Schema
const categoryschema = new schmea({
    name: String,
    colorcode: String
})

const category = mongoose.model('category', categoryschema)
module.exports = category;