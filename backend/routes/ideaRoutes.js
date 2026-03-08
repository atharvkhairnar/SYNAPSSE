const express = require("express");
const { generateIdeas } = require("../services/ideaService.js");

const router = express.Router();

/*
GENERATE IDEAS
*/

router.post("/generate-ideas", async (req,res)=>{

try{

const { niche, platform } = req.body;

if(!niche){

return res.status(400).json({
success:false,
message:"Niche is required"
});

}

const ideas = await generateIdeas(niche, platform);

res.json({
success:true,
data:ideas
});

}catch(error){

console.error("Idea generation error:",error);

res.status(500).json({
success:false,
message:"Idea generation failed"
});

}

});

module.exports = router;