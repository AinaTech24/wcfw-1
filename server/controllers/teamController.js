const TeamMember = require('../models/TeamMember');

exports.getTeamMembers = async (req, res) => {
    try {
        const members = await TeamMember.find().sort({ order: 1, createdAt: -1 });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTeamMember = async (req, res) => {
    try {
        const member = await TeamMember.create(req.body);
        res.status(201).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTeamMember = async (req, res) => {
    try {
        const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTeamMember = async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.json({ message: 'Team member deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.reorderTeamMembers = async (req, res) => {
    try {
        const { orderedIds } = req.body; // Array of IDs in desired order
        const operations = orderedIds.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { order: index }
            }
        }));
        await TeamMember.bulkWrite(operations);
        res.json({ message: 'Order updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
