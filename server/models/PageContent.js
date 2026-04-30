const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        index: true
    },
    section: {
        type: String,
        required: true,
        index: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    seoSettings: {
        metaTitle: String,
        metaDescription: String,
        metaKeywords: String,
        canonicalUrl: String,
        ogImage: String,
        robotsTag: {
            type: String,
            default: 'index, follow'
        }
    }
}, { timestamps: true });

// Ensure unique combination of page and section
pageContentSchema.index({ page: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('PageContent', pageContentSchema);
