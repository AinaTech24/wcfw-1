const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    youtubeUrl: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: 'General',
        trim: true
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    seo: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        keywords: { type: String, default: '' },
        canonicalUrl: { type: String, default: '' },
        robotsTag: { type: String, default: 'index, follow' },
        schemaMarkup: { type: String, default: '' }
    },
    faqs: [{
        question: { type: String, default: '' },
        answer: { type: String, default: '' }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
