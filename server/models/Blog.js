const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Nikhil Thakkar'
    },
    image: {
        type: String
    },
    tags: [String],
    isPublished: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,
    canonicalUrl: String,
    ogImage: String,
    robotsTag: {
        type: String,
        default: 'index, follow'
    },
    faq: [{
        question: String,
        answer: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
