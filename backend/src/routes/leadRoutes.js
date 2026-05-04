const express = require("express");
const router = express.Router();

const {
    createLead,
    deleteLead,
    getLeads,
    updateLead,
} = require("../controllers/leadController");

// routes
router.post("/", createLead);
router.get("/", getLeads);
router.patch("/:id", updateLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;
