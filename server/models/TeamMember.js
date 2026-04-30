const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ['founding', 'director', 'leadership', 'associate_partner', 'insurance_head', 'rm', 'equity_head'],
        default: 'rm'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
