const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    handle: {
        type: String,
    },
    avatarURL: {
        type: String,
    },
    stars: {
        type: Number,
    },
    repoReadMes: {
        type: String,
    },
    cache: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)