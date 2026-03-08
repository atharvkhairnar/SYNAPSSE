const express = require("express")
const { exportTXT, exportPDF } = require("../services/exportService.js")

const router = express.Router()

/* TXT EXPORT */

router.post("/txt", (req,res)=>{

try{

const script = req.body

if(!script){
return res.status(400).json({
success:false,
message:"Script data required"
})
}

const filePath = exportTXT(script)

res.download(filePath,"script.txt")

}catch(err){

console.error("TXT export error:",err)

res.status(500).json({
success:false,
message:"TXT export failed"
})

}

})


/* PDF EXPORT */

router.post("/pdf", async (req,res)=>{

try{

const script = req.body

if(!script){
return res.status(400).json({
success:false,
message:"Script data required"
})
}

const filePath = await exportPDF(script)

res.download(filePath,"script.pdf")

}catch(err){

console.error("PDF export error:",err)

res.status(500).json({
success:false,
message:"PDF export failed"
})

}

})

module.exports = router