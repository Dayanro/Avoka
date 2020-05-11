const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    summary: String,
    content: String,
    imageURL: String,
    tags_id: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    views: number,
    status: { type: String, enum: ["Borrador", "Publicado"], default: "Borrador" },
}, {
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post