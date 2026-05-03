const Lead = require("../models/leadModel");

const VISIT_SCHEDULED = "Visit Scheduled";
const ALLOWED_UPDATES = ["name", "phone", "source", "status", "assignedTo", "visitDate"];

// Validation helpers
const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(String(phone).replace(/[\s\-\(\)]/g, ''));
};

const validateRequired = (data, fields) => {
    const missing = fields.filter(field => !data[field] || data[field].toString().trim() === '');
    if (missing.length > 0) {
        throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
};

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const normalizeVisitDate = (visitDate) => {
    if (!visitDate) return null;

    const parsedDate = new Date(visitDate);
    if (Number.isNaN(parsedDate.getTime())) {
        throw new Error("Visit date is invalid");
    }

    return parsedDate;
};

const validateLeadIdentity = (updates) => {
    const { name, phone } = updates;

    if (hasOwn(updates, "name") && (!name || !name.toString().trim())) {
        throw new Error("Name is required");
    }

    if (hasOwn(updates, "phone") && (!phone || !phone.toString().trim())) {
        throw new Error("Phone number is required");
    }

    if (hasOwn(updates, "phone") && phone && !validatePhone(phone)) {
        throw new Error("Invalid phone number format");
    }
};

const sanitizeText = (value) => value.toString().trim();

const pickAllowedUpdates = (updates) => {
    return ALLOWED_UPDATES.reduce((picked, field) => {
        if (hasOwn(updates, field)) {
            picked[field] = updates[field];
        }
        return picked;
    }, {});
};

const updateLead = async ({ id, status, assignedTo, visitDate, ...rest }) => {
    const lead = await Lead.findById(id);

    if (!lead) {
        return null;
    }

    const updates = pickAllowedUpdates({ status, assignedTo, visitDate, ...rest });
    validateLeadIdentity(updates);

    if (hasOwn(updates, "name")) {
        lead.name = sanitizeText(updates.name);
    }

    if (hasOwn(updates, "phone")) {
        lead.phone = sanitizeText(updates.phone);
    }

    if (hasOwn(updates, "source")) {
        lead.source = updates.source;
    }

    if (hasOwn(updates, "assignedTo")) {
        lead.assignedTo = updates.assignedTo || "Unassigned";
    }

    const statusWasVisitScheduled = lead.status === VISIT_SCHEDULED;
    const statusRequested = hasOwn(updates, "status");
    const visitDateRequested = hasOwn(updates, "visitDate");

    if (statusRequested) {
        lead.status = updates.status;
    }

    if (visitDateRequested) {
        lead.visitDate = normalizeVisitDate(updates.visitDate);
        if (lead.visitDate) {
            lead.status = VISIT_SCHEDULED;
        }
    }

    if (statusWasVisitScheduled && statusRequested && lead.status !== VISIT_SCHEDULED) {
        lead.visitDate = null;
    }

    if (lead.visitDate && lead.status !== VISIT_SCHEDULED) {
        throw new Error("Visit date can only be set when status is 'Visit Scheduled'");
    }

    if (lead.status === VISIT_SCHEDULED && !lead.visitDate) {
        throw new Error("Visit date is required when status is 'Visit Scheduled'");
    }

    return lead.save();
};

exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json(leads);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.createLead = async (req, res) => {
    try {
        const { name, phone, ...otherData } = req.body;

        validateRequired({ name, phone }, ['name', 'phone']);
        validateLeadIdentity({ name, phone });

        const leadData = {
            name: sanitizeText(name),
            phone: sanitizeText(phone),
            ...otherData,
            status: "New",
            assignedTo: otherData.assignedTo || "Unassigned"
        };

        const lead = await Lead.create(leadData);
        res.status(201).json(lead);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(400).json({ error: error.message });
    }
};

exports.updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await updateLead({ id, ...req.body });

        if (!lead) {
            return res.status(404).json({ error: "Lead not found" });
        }

        res.status(200).json(lead);
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(400).json({ error: error.message });
    }
};
