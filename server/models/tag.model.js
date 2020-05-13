const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: String,
    photo: String,
    definition:String
}, {
    timestamps: true
})

const Tag = mongoose.model("Tag", tagSchema)

module.exports = Tag