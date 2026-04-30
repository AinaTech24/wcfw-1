const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema({
    companyName: {
        type: String,
        default: 'We Care Freedom Wealth'
    },
    companyEmail: {
        type: String,
        default: ''
    },
    companyPhone: {
        type: String,
        default: ''
    },
    companyAddress: {
        type: String,
        default: ''
    },
    whatsappNumber: {
        type: String,
        default: ''
    },
    socialLinks: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        twitter: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        youtube: { type: String, default: '' }
    },
    seo: {
        defaultMetaTitle: { type: String, default: '' },
        defaultMetaDescription: { type: String, default: '' },
        defaultMetaKeywords: { type: String, default: '' },
        googleAnalyticsId: { type: String, default: '' }
    },
    footerText: {
        type: String,
        default: ''
    },
    heroTagline: {
        type: String,
        default: ''
    },
    heroSubtitle: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
