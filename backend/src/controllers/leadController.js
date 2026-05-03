const Lead = require("../models/leadModel");

exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json(leads);
    } catch (error) {
        console.log("ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.createLead = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const lead = await Lead.create(req.body);

        res.status(201).json(lead);
    } catch (error) {
        console.log("ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const lead = await Lead.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!lead) {
            return res.status(404).json({ error: "Lead not found" });
        }

        res.status(200).json(lead);
    } catch (error) {
        console.log("ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
};
