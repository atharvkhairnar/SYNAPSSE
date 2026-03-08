const express = require("express");
const { generateIdeas } = require("../services/ideaService.js");

const router = express.Router();

router.post("/generate-ideas", async (req,res)=>{

const { niche, platform } = req.body;

try{

const ideas = await generateIdeas(niche,platform);

res.json({
success:true,
data:ideas
});

}catch(error){

console.log(error);

res.status(500).json({
success:false,
message:"Idea generation failed"
});

}

});

module.exports = router;