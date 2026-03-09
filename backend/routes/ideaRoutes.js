const express = require("express");
const { generateIdeas } = require("../services/ideaService.js");

const router = express.Router();

/* ================================
   GENERATE IDEAS
================================ */

router.post("/generate-ideas", async (req, res) => {

try {

const { niche, platform } = req.body;

/* VALIDATION */

if (!niche) {
return res.status(400).json({
success: false,
message: "Niche is required"
});
}

/* DEFAULT PLATFORM */

const selectedPlatform = platform || "Instagram Reels";

/* CALL AI SERVICE */

const result = await generateIdeas(niche, selectedPlatform);

/* RESPONSE */

res.json({
success: true,
data: {
ideas: result.ideas || []
}
});

} catch (error) {

console.error("Idea generation error:", error);

res.status(500).json({
success: false,
message: "Idea generation failed"
});

}

});

module.exports = router;