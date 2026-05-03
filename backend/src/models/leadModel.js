const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters long"],
            maxlength: [100, "Name cannot exceed 100 characters"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            validate: {
                validator: function(v) {
                    // Basic phone validation - allows international format
                    return /^[\+]?[1-9][\d]{0,15}$/.test(v.replace(/[\s\-\(\)]/g, ''));
                },
                message: "Invalid phone number format"
            }
        },
        source: {
            type: String,
            default: "Manual",
            trim: true,
        },
        status: {
            type: String,
            enum: {
                values: ["New", "Contacted", "Visit Scheduled", "Converted", "Lost"],
                message: "Status must be one of: New, Contacted, Visit Scheduled, Converted, Lost"
            },
            default: "New",
        },
        assignedTo: {
            type: String,
            default: "Unassigned",
            trim: true,
        },
        visitDate: {
            type: Date,
            validate: {
                validator: function(v) {
                    // If visitDate exists, status must be "Visit Scheduled"
                    if (v && this.status !== "Visit Scheduled") {
                        return false;
                    }
                    return true;
                },
                message: "Visit date can only be set when status is 'Visit Scheduled'"
            }
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Pre-save middleware to enforce business rules
leadSchema.pre('save', function(next) {
    // If visitDate is set, status must be "Visit Scheduled"
    if (this.visitDate && this.status !== "Visit Scheduled") {
        this.status = "Visit Scheduled";
    }

    // If status is "Visit Scheduled", visitDate must exist
    if (this.status === "Visit Scheduled" && !this.visitDate) {
        return next(new Error("Visit date is required when status is 'Visit Scheduled'"));
    }

    // If status changes from "Visit Scheduled", remove visitDate
    if (this.isModified('status') && this.status !== "Visit Scheduled") {
        this.visitDate = null;
    }

    next();
});

// Virtual for formatted visit date
leadSchema.virtual('formattedVisitDate').get(function() {
    if (!this.visitDate) return null;
    return this.visitDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
});

module.exports = mongoose.model("Lead", leadSchema);