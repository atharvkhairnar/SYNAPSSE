const express = require("express");

const {
generateScript,
saveScript,
getScriptHistory,
deleteScript
} = require("../services/scriptService.js");

const router = express.Router();

/* Generate Script */

router.post("/generate-script", async (req,res)=>{

try{

const result = await generateScript(req.body);

res.json({
success:true,
data:result
});

}catch(error){

console.error("Script generation error:",error);

res.status(500).json({
success:false,
message:"Script generation failed"
});

}

});


/* Save Script */

router.post("/save-script", async (req,res)=>{

try{

const { script } = req.body;

const saved = await saveScript(script);

res.json({
success:true,
data:saved
});

}catch(error){

console.error("Save script error:",error);

res.status(500).json({
success:false,
message:"Failed to save script"
});

}

});


/* Get Script History */

router.get("/script-history", async (req,res)=>{

try{

const history = await getScriptHistory();

res.json({
success:true,
data:history
});

}catch(error){

console.error("Get history error:",error);

res.status(500).json({
success:false,
message:"Failed to fetch history"
});

}

});


/* Delete Script */

router.delete("/script-history/:id", async (req,res)=>{

try{

const updated = await deleteScript(req.params.id);

res.json({
success:true,
data:updated
});

}catch(error){

console.error("Delete script error:",error);

res.status(500).json({
success:false,
message:"Failed to delete script"
});

}

});


/* Get Scripts */

router.get("/scripts", async (req,res)=>{

try{

const scripts = await getScriptHistory();

res.json({
success:true,
data:scripts
});

}catch(error){

console.error("Get scripts error:",error);

res.status(500).json({
success:false,
message:"Failed to fetch scripts"
});

}

});


module.exports = router;