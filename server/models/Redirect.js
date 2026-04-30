const mongoose = require('mongoose');

const redirectSchema = new mongoose.Schema({
    fromPath: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    toPath: {
        type: String,
        required: true,
        trim: true
    },
    statusCode: {
        type: Number,
        default: 301, // 301 for Permanent, 302 for Temporary
        enum: [301, 302]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Redirect', redirectSchema);
