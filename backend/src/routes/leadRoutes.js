const express = require("express");
const router = express.Router();

const {
    createLead,
    getLeads,
    updateLead,
} = require("../controllers/leadController");

// routes
router.post("/", createLead);
router.get("/", getLeads);
router.patch("/:id", updateLead);
router.put("/:id", updateLead);

module.exports = router;
