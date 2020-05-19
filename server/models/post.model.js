const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    theHook: String,
    realStory: String,
    expandOnThePoint: String,
    closing: String,
    readTime: Number,
    fastReceipe: String,
    photo: String,
    tags_id: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    views: Number,
    status: { type: String, enum: ["Borrador", "Publicado"], default: "Borrador" }
}, {
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post