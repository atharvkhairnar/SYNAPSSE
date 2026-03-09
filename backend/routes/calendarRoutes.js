const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const cacheDir = path.join(__dirname, "../cache");
const filePath = path.join(cacheDir, "calendar.json");

/* ================================
   ENSURE CACHE + FILE EXIST
================================ */

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

/* ================================
   ADD IDEA TO CALENDAR
================================ */

router.post("/add", (req, res) => {

try {

const { day, idea } = req.body;

if (!idea) {
return res.status(400).json({
success:false,
message:"Idea is required"
});
}

let calendar = JSON.parse(fs.readFileSync(filePath,"utf8") || "[]");

const newIdea = {
id: Date.now(),
day: day || "Auto",
idea: idea
};

calendar.push(newIdea);

fs.writeFileSync(filePath, JSON.stringify(calendar,null,2));

res.json({
success:true,
data:calendar
});

} catch (err) {

console.error("Calendar add error:",err);

res.status(500).json({
success:false,
message:"Server error"
});

}

});

/* ================================
   GET CALENDAR
================================ */

router.get("/", (req,res)=>{

try{

let calendar = JSON.parse(fs.readFileSync(filePath,"utf8") || "[]");

res.json({
success:true,
data:calendar
});

}catch(err){

console.error("Calendar read error:",err);

res.json({
success:true,
data:[]
});

}

});

module.exports = router;