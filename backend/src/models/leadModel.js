const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            default: "Manual",
        },
        status: {
            type: String,
            enum: ["New", "Contacted", "Visit Scheduled", "Converted", "Lost"],
            default: "New",
        },
        assignedTo: {
            type: String,
            default: "Unassigned",
        },
        visitDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);