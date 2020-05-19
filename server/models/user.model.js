const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    avatar: String,
    shortBio: String,
    username: String,
    email: String,
    password: String,
    status: { type: String, enum: ["Pending Confirmation", "Active"], default: "Pending Confirmation" },
    confirmationCode: { type: Schema.Types.Mixed, unique: true },
    interest: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    //posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    role: { type: String, enum: ["Editor", "Admin"], default: "Editor" },
    following: [String],
    readingList: [String]
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User