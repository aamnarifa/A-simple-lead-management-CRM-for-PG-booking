const express = require("express");
const cors = require("cors");

const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = app;