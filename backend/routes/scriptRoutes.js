import express from "express";

import { generateScript } from "../services/scriptService.js";

import {
saveScript,
getScriptHistory,
deleteScript
} from "../services/scriptService.js";

const router = express.Router();


/* Generate Script */

router.post("/generate-script",
     async (req,res)=>{

try{

const result = await generateScript(req.body);

res.json({
success:true,
data:result
});

}catch(error){

res.status(500).json({
success:false,
message:"Script generation failed"
});

}

});


/* Save Script */

router.post("/save-script",(req,res)=>{

const {script} = req.body;

const saved = saveScript(script);

res.json({
success:true,
data:saved
});

});


/* Get Script History */

router.get("/script-history",(req,res)=>{

const history = getScriptHistory();

res.json({
success:true,
data:history
});

});


/* Delete Script */

router.delete("/script-history/:id",(req,res)=>{

const updated = deleteScript(req.params.id);

res.json({
success:true,
data:updated
});

});


export default router;


import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

router.get("/scripts",(req,res)=>{

const filePath = path.join(__dirname,"../cache/scripts.json")

if(!fs.existsSync(filePath)){
return res.json({
success:true,
data:[]
})
}

const scripts = JSON.parse(fs.readFileSync(filePath))

res.json({
success:true,
data:scripts
})

})





