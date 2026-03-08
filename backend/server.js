const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const scriptRoutes = require("./routes/scriptRoutes");
const ideaRoutes = require("./routes/ideaRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const exportRoutes = require("./routes/exportRoutes");

const fs = require("fs");
const path = require("path");

const app = express();

/*
BODY PARSERS
*/
app.use(cors());
app.use(express.json());

/*
FIX API GATEWAY "/default" STAGE PREFIX
*/
app.use((req, res, next) => {
  if (req.url.startsWith("/default")) {
    req.url = req.url.replace("/default", "");
  }
  next();
});

/*
HEALTH CHECK ROUTE
*/
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Synapsse Backend Running 🚀"
  });
});

/*
API ROUTES
*/
app.use("/api", scriptRoutes);
app.use("/api", ideaRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/export-script", exportRoutes);

/*
SAVE SCRIPT API
*/
app.post("/api/scripts", (req, res) => {

  const { topic, script } = req.body;

  const filePath = path.join(__dirname, "cache", "scripts.json");

  let scripts = [];

  if (fs.existsSync(filePath)) {
    scripts = JSON.parse(fs.readFileSync(filePath));
  }

  scripts.push({
    id: Date.now(),
    topic: topic,
    script: script,
    createdAt: new Date().toISOString()
  });

  fs.writeFileSync(filePath, JSON.stringify(scripts, null, 2));

  res.json({
    success: true
  });

});

/*
GET SCRIPT HISTORY
*/
app.get("/api/scripts", (req, res) => {

  const filePath = path.join(__dirname, "cache", "scripts.json");

  if (!fs.existsSync(filePath)) {
    return res.json({
      success: true,
      data: []
    });
  }

  const scripts = JSON.parse(fs.readFileSync(filePath));

  res.json({
    success: true,
    data: scripts
  });

});

/*
404 HANDLER
*/
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/*
EXPORT FOR AWS LAMBDA
*/
module.exports.handler = serverless(app);