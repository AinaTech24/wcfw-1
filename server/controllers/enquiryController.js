const Enquiry = require('../models/Enquiry');

exports.createEnquiry = async (req, res) => {
    try {
        const enquiryData = {
            ...req.body,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        };
        const enquiry = await Enquiry.create(enquiryData);
        res.status(201).json(enquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEnquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
        res.json(enquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEnquiry = async (req, res) => {
    try {
        await Enquiry.findByIdAndDelete(req.params.id);
        res.json({ message: 'Enquiry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
